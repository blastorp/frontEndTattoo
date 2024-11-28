import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/membresiaadd.css";

const MembresiaADMINEdit = () => {
  const { id } = useParams(); // Captura el id de la URL
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    nivel: "",
    precioMensual: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    duracion: "",
    publicar: false,
  });
  const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito/error

  // Cargar los datos de la membresía cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApiM2(`${ENDPOINTS.GETMEMBRESIA}/${id}`);
        if (response) {
          setFormData({
            nivel: response.nivel,
            precioMensual: response.precioMensual,
            fechaCreacion: response.fechaCreacion,
            fechaVencimiento: response.fechaVencimiento,
            duracion: response.duracion,
            publicar: response.publicar,
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setMensaje("Error al cargar los datos.");
      }
    };

    fetchData();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (!formData.nivel || !formData.precioMensual || !formData.fechaCreacion || !formData.fechaVencimiento || !formData.duracion) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realiza la actualización de la membresía
      const response = await fetchApiM2(`${ENDPOINTS.UPDATEMEMBRESIA}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("Membresía actualizada exitosamente!");
        navigate("/pages/membresiacon"); // Redirige al listado de membresías
      } else {
        const error = await response.json();
        setMensaje(`Error: ${error.message || "No se pudo actualizar la membresía"}`);
      }
    } catch (error) {
      console.error("Error al actualizar la membresía:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Editar membresía</h1>
      <div className="form-content">
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nivel" className="form-label">Nivel</label>
            <input
              type="text"
              id="nivel"
              name="nivel"
              className="input"
              value={formData.nivel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="precioMensual" className="form-label">Precio mensual</label>
            <input
              type="number"
              id="precioMensual"
              name="precioMensual"
              className="input"
              value={formData.precioMensual}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaCreacion" className="form-label">Fecha de creación</label>
            <input
              type="date"
              id="fechaCreacion"
              name="fechaCreacion"
              className="date"
              value={formData.fechaCreacion}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              className="date"
              value={formData.fechaVencimiento}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duracion" className="form-label">Duración (en meses)</label>
            <input
              type="number"
              id="duracion"
              name="duracion"
              className="input"
              value={formData.duracion}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="publicar"
                name="publicar"
                checked={formData.publicar}
                onChange={handleChange}
              />
              Publicar
            </label>
          </div>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <button type="submit" className="button">Actualizar</button>
        </form>
        
        <div className="image-container">
          <img src="https://tiusr39pl.cuc-carrera-ti.ac.cr/images/Tatto2.jpeg" alt="Imagen" className="form-image" />
        </div>
      </div>
    </div>
  );
};

export default MembresiaADMINEdit;
