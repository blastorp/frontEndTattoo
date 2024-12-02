import React, { useState } from "react";
import "../estilos/agendaartistasadd.css"
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";

const AgendaArtistaADMINAdd = () => {
    // Estados para los datos del formulario
    const [formData, setFormData] = useState({
      artista: "",
      fecha: "",
      hora: "",
      publicar: false,
      membresia: false,
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
      if (!formData.artista || !formData.fecha || !formData.hora) {
        setMensaje("Por favor, completa todos los campos.");
        return;
      }
  
      try {
        // Llamada al endpoint usando fetchApiM2
        const response = await fetchApiM2(ENDPOINTS.CREATERESERVA, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        // Manejar respuesta del servidor
        if (response.ok) {
          setMensaje("¡Reserva creada exitosamente!");
          setFormData({
            artista: "",
            fecha: "",
            hora: "",
            publicar: false,
            membresia: false,
          });
        } else {
          const error = await response.json();
          setMensaje(`Error: ${error.message || "No se pudo crear la reserva"}`);
        }
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        setMensaje("Error al conectar con el servidor.");
      }
    };
  
    return (
      <div className="form-container">
        <h1 className="form-title">Agregar agenda de artistas</h1>
        <div className="form-content">
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="artista" className="form-label">Artista</label>
              <select
                id="artista"
                name="artista"
                className="select"
                value={formData.artista}
                onChange={handleChange}
              >
                <option value="">Selecciona un artista</option>
                <option value="artista1">Artista 1</option>
                <option value="artista2">Artista 2</option>
                <option value="artista3">Artista 3</option>
              </select>
            </div>
  
            <div className="form-group">
              <label htmlFor="fecha" className="form-label">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                className="date"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="hora" className="form-label">Hora</label>
              <input
                type="time"
                id="hora"
                name="hora"
                className="time"
                value={formData.hora}
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
  
            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="membresia"
                  name="membresia"
                  checked={formData.membresia}
                  onChange={handleChange}
                />
                Membresía
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
  
  export default AgendaArtistaADMINAdd;