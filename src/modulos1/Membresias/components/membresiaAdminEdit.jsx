import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/membresiaedit.css";

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
    beneficiosSeleccionados: [],
  });
  const [beneficios, setBeneficios] = useState([]); // Beneficios disponibles
  const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito/error

  // Cargar los datos de la membresía cuando el componente se monta
  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const response = await fetchApiM2(ENDPOINTS.GET_BENEFICIOS);
        if (response.ok) {
          const data = await response.json();
          const opciones = data.map((beneficio) => ({
            value: beneficio.id,
            label: beneficio.nombre,
          }));
          setBeneficios(opciones);
        } else {
          console.error("Error al cargar beneficios");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

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
            beneficiosSeleccionados: response.beneficiosSeleccionados || [],
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setMensaje("Error al cargar los datos.");
      }
    };

    fetchBeneficios();
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

  // Manejar cambios en los beneficios seleccionados
  const handleBeneficiosChange = (selectedOptions) => {
    setFormData({
      ...formData,
      beneficiosSeleccionados: selectedOptions || [],
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
      const dataToSend = {
        ...formData,
        beneficiosSeleccionados: formData.beneficiosSeleccionados.map((b) => b.value),
      };

      const response = await fetchApiM2(`${ENDPOINTS.UPDATEMEMBRESIA}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
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
            <NumericFormat
              id="precioMensual"
              name="precioMensual"
              className="input"
              value={formData.precioMensual}
              onValueChange={(values) => {
                setFormData({ ...formData, precioMensual: values.value });
              }}
              thousandSeparator={true}
              prefix={"₡"}
              decimalScale={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaCreacion" className="form-label">Fecha de creación</label>
            <input
              type="date"
              id="fechaCreacion"
              name="fechaCreacion"
              className="input"
              value={formData.fechaCreacion}
              onChange={handleChange}
              disabled  // Deshabilitar el campo para evitar que se modifique
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              className="input"
              value={formData.fechaVencimiento}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duracion" className="form-label">Duración (en meses)</label>
            <select
              id="duracion"
              name="duracion"
              className="select"
              value={formData.duracion}
              onChange={handleChange}
            >
              <option value="1">1 mes</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="beneficios" className="form-label">Selecciona los beneficios</label>
            <Select
              isMulti
              options={beneficios}
              value={formData.beneficiosSeleccionados}
              onChange={handleBeneficiosChange}
              classNamePrefix="react-select"
              placeholder="Selecciona beneficios..."
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
