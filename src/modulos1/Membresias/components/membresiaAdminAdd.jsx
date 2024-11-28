import React, { useState } from "react";
import "../estilos/membresiaadd.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const MembresiaADMINAdd = () => {
  // Estados para los datos del formulario
  const [formData, setFormData] = useState({
    nivel: "",
    precioMensual: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    duracion: "",
    publicar: false,
  });

  const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito/error

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
      // Llamada al endpoint usando fetchApiM2
      const response = await fetchApiM2(ENDPOINTS.CREATEMEMBRESIA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Manejar respuesta del servidor
      if (response.ok) {
        setMensaje("¡Membresía creada exitosamente!");
        setFormData({
          nivel: "",
          precioMensual: "",
          fechaCreacion: "",
          fechaVencimiento: "",
          duracion: "",
          publicar: false,
        });
      } else {
        const error = await response.json();
        setMensaje(`Error: ${error.message || "No se pudo crear la membresía"}`);
      }
    } catch (error) {
      console.error("Error al crear la membresía:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Nueva membresía</h1>
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

          <button type="submit" className="button">Enviar</button>
        </form>
        
        {mensaje && <p className="mensaje">{mensaje}</p>}
        
        <div className="image-container">
          <img src="https://tiusr39pl.cuc-carrera-ti.ac.cr/images/Tatto2.jpeg" alt="Imagen" className="form-image" />
        </div>
      </div>
    </div>
  );
};

export default MembresiaADMINAdd;
