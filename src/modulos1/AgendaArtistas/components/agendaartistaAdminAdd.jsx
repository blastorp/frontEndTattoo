import React, { useState, useEffect } from "react";
import "../estilos/agendaartistasadd.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import { useNavigate } from "react-router-dom"; // Para la navegación

const AgendaArtistaADMINAdd = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    artista: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    disponible: false,
    esMembresia: false,
    Publicar: false,
  });

  // Estado para los artistas, mensaje y estado de carga
  const [artistas, setArtistas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Usar para redirigir a otra página

  // Función para obtener los artistas desde el backend
  useEffect(() => {
    const fetchArtistas = async () => {
      setLoading(true);
      try {
        const artistasResponse = await fetchApiM2(ENDPOINTS.GET_ARTISTA_POR_IDNOMBRE);
        console.log(artistasResponse); // Verificar los datos recibidos
  
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
  
    fetchArtistas();
  }, []);
  
  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos obligatorios estén completos
    if (!formData.artista || !formData.fecha || !formData.horaInicio || !formData.horaFin) {
      setMensaje("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Mostrar en consola los datos que se enviarán al backend
    console.log("Datos a enviar al backend:", {
      IdArtista: formData.artista, // El ID del artista
      Fecha: formData.fecha,
      HoraInicio: formData.horaInicio,
      HoraFin: formData.horaFin,
      Disponible: formData.disponible,
      EsMembresia: formData.esMembresia,
      Publicar: formData.publicar,
    });

    setLoading(true);
    try {
      // Enviar los datos al backend para crear una nueva agenda
      const response = await fetchApiM2(
        ENDPOINTS.CREATE_ARTISTAAGENDA, // Endpoint para crear la agenda
        "POST",
        {
          IdArtista: formData.artista, // Aquí se usa el IdArtista
          Fecha: formData.fecha,
          HoraInicio: formData.horaInicio,
          HoraFin: formData.horaFin,
          Disponible: formData.disponible,
          EsMembresia: formData.esMembresia,
          Publicar: formData.publicar,
        },
        { "Content-Type": "application/json" }
      );

      // Si la respuesta es exitosa, mostramos el mensaje de éxito
      setMensaje("Agenda creada exitosamente!");

      // Limpiar el formulario después de la creación
      setFormData({
        artista: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        disponible: false,
        esMembresia: false,
        publicar: false,
      });

      // Redirigir a la página de agenda de artistas (opcional)
      navigate("/pages/agendaartistascon");
    } catch (error) {
      // En caso de error, mostrar mensaje de error
      setMensaje(`Error: ${error.message || "No se pudo crear la agenda."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Crear Agenda de Artista</h1>
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
                value={formData.artista}  // Aquí el valor debería ser un número
                onChange={handleChange}
                >
                <option value="">Seleccionar artista</option>
                {artistas.map((artista) => (
                  <option key={artista.idArtista} value={artista.idArtista}>  {/* Usar IdArtista como value */}
                    {artista.nombre}  {/* Mostrar el nombre del artista */}
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
                Disponibilidad
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
            
            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="membresia"
                  name="publicar"
                  checked={formData.publicar}
                  onChange={handleChange}
                />
                Publicar
              </label>
            </div>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Creando..." : "Crear Agenda"}
            </button>
          </form>
        )}

        <div className="image-container">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset8.jpg?alt=media&token=4fdd0a8b-6d4a-4e0c-99ef-eced94eac8a4"
            alt="Imagen"
            className="form-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AgendaArtistaADMINAdd;
