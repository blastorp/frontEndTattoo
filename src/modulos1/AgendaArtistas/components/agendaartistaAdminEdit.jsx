import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../estilos/agendaartistasedit.css";
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";
//import AgendaArtistaADMINCon from "./agendaartistaAdminCon";

const AgendaArtistaADMINEdit = () => {
    const { id } = useParams(); // Captura el id de la agenda desde la URL
  const navigate = useNavigate(); // Hook para navegación
  const [formData, setFormData] = useState({
    artista: "",
    fecha: "",
    hora: "",
    publicar: false,
    membresia: false,
  });
  const [artistas, setArtistas] = useState([]); // Lista de artistas para el select
  const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito/error

  // Cargar los datos de la agenda y artistas disponibles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos de la agenda
        const agendaResponse = await fetchApiM2(`${ENDPOINTS.GETAGENDA}/${id}`);
        if (agendaResponse) {
          setFormData({
            artista: agendaResponse.artista,
            fecha: agendaResponse.fecha,
            hora: agendaResponse.hora,
            publicar: agendaResponse.publicar,
            membresia: agendaResponse.membresia,
          });
        }

        // Obtener la lista de artistas
        const artistasResponse = await fetchApiM2(ENDPOINTS.GETARTISTAS);
        if (artistasResponse) {
          setArtistas(artistasResponse); // Se asume que devuelve un array de artistas
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
    if (!formData.artista || !formData.fecha || !formData.hora) {
      setMensaje("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      // Realiza la actualización de la agenda
      const response = await fetchApiM2(`${ENDPOINTS.UPDATEAGENDA}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("Agenda actualizada exitosamente!");
        navigate("/pages/agenda"); // Redirige al listado de agendas
      } else {
        const error = await response.json();
        setMensaje(`Error: ${error.message || "No se pudo actualizar la agenda"}`);
      }
    } catch (error) {
      console.error("Error al actualizar la agenda:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Editar Agenda de Artista</h1>
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
              <option value="">Seleccionar artista</option>
              {artistas.map((artista) => (
                <option key={artista.id} value={artista.id}>
                  {artista.nombre}
                </option>
              ))}
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
  export default AgendaArtistaADMINEdit;