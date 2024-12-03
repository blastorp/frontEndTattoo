import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../estilos/agendaartistasedit.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const AgendaArtistaADMINEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    artista: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    disponible: false,
    esMembresia: false,
  });

  const [artistas, setArtistas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener datos de la agenda por ID
        const agendaResponse = await fetchApiM2(
          ENDPOINTS.GET_ARTISTAAGENDA_POR_ID.replace("{idAgenda}", id)
        );

        if (agendaResponse) {
          const fechaFormateada = new Date(agendaResponse.fecha)
            .toISOString()
            .split("T")[0];
          setFormData({
            artista: agendaResponse.idArtista || "",
            fecha: fechaFormateada,
            horaInicio: agendaResponse.horaInicio || "",
            horaFin: agendaResponse.horaFin || "",
            disponible: agendaResponse.disponible || false,
            esMembresia: agendaResponse.esMembresia || false,
          });
        } else {
          setMensaje("Agenda no encontrada.");
        }

        const artistasResponse = await fetchApiM2(ENDPOINTS.GET_ARTISTA_POR_IDNOMBRE);
        if (artistasResponse) {
          setArtistas(artistasResponse);
        } else {
          setMensaje("No se pudieron cargar los artistas.");
        }
      } catch (error) {
        setMensaje("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.artista || !formData.fecha || !formData.horaInicio || !formData.horaFin) {
      setMensaje("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await fetchApiM2(
        ENDPOINTS.UPDATE_ARTISTA_AGENDA.replace("{idAgenda}", id),
        "PUT", 
        formData,
        { "Content-Type": "application/json" }
      );

      setMensaje("Agenda actualizada exitosamente!");
      navigate("/pages/agendaartistascon");
    } catch (error) {
      setMensaje(`Error: ${error.message || "No se pudo actualizar la agenda."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Editar Agenda de Artista</h1>
      <div className="form-content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
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
                  <option key={artista.idArtista} value={artista.idArtista}> {/* Cambio aquí */}
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
              <label htmlFor="horaInicio" className="form-label">Hora de Inicio</label>
              <input
                type="time"
                id="horaInicio"
                name="horaInicio"
                className="time"
                value={formData.horaInicio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="horaFin" className="form-label">Hora de Fin</label>
              <input
                type="time"
                id="horaFin"
                name="horaFin"
                className="time"
                value={formData.horaFin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="disponible"
                  name="disponible"
                  checked={formData.disponible}
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
                  name="esMembresia"
                  checked={formData.esMembresia}
                  onChange={handleChange}
                />
                Membresía
              </label>
            </div>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </form>
        )}

        <div className="image-container">
          <img
            src="https://tiusr39pl.cuc-carrera-ti.ac.cr/images/Tatto2.jpeg"
            alt="Imagen"
            className="form-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AgendaArtistaADMINEdit;
