import React, { useState, useEffect } from "react";
import "../estilos/galeria.css";
import { FaTimesCircle } from "react-icons/fa";
import fetchApiM2 from "../../../services/api/fetchApiM2"; // Asegúrate de que fetchApiM2 esté configurado correctamente
import ENDPOINTS from "../../../services/api/endpoints"; // Asegúrate de que el endpoint esté correctamente definido

const GaleriaCliente = () => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenExpandida, setImagenExpandida] = useState(null);

  // Función para hacer el fetch de las imágenes
  const fetchImagenes = async () => {
    try {
      const response = await fetchApiM2(ENDPOINTS.GETGALERIAPUBLICADOS);
      if (response.ok) {
        const data = await response.json();
        setImagenes(data); // Suponiendo que 'data' es el array de imágenes que devuelve la API
      } else {
        console.error("Error al obtener las imágenes");
      }
    } catch (error) {
      console.error("Hubo un problema con la solicitud:", error);
    }
  };

  // Llamar a la función fetchImagenes cuando el componente se monta
  useEffect(() => {
    fetchImagenes();
  }, []);

  const handleImageClick = (src) => {
    setImagenExpandida(src);
  };

  const handleClose = () => {
    setImagenExpandida(null);
  };

  return (
    <div>
      <h1>Galería</h1>
      
      {/* Filtros */}
      <section className="filtros">
        <div className="filtro-item">
          <select>
            <option value="Estilo">
              <i className="bi bi-palette"></i> Estilo
            </option>
            {/* Agregar más opciones según sea necesario */}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Ubicacion">
              <i className="bi bi-geo-alt"></i> Ubicación
            </option>
            {/* Agregar más opciones */}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Tamano">
              <i className="bi bi-arrows-expand"></i> Tamaño
            </option>
            {/* Agregar más opciones */}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Color">
              <i className="bi bi-paint-bucket"></i> Color
            </option>
            {/* Agregar más opciones */}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Tematica">
              <i className="bi bi-file-earmark-text"></i> Temática
            </option>
            {/* Agregar más opciones */}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Artista">
              <i className="bi bi-person"></i> Artista
            </option>
            {/* Agregar más opciones */}
          </select>
        </div>
      </section>

      {/* Galería de imágenes */}
      <section className="galeria">
        {imagenes.length > 0 ? (
          imagenes.map((imagen, index) => (
            <div key={index} className="imagen" onClick={() => handleImageClick(imagen.url)}>
              <img src={imagen.url} alt={`Imagen ${index}`} />
            </div>
          ))
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </section>

      {/* Imagen expandida */}
      {imagenExpandida && (
        <div id="imagenExpandida" className="imagen-expandida">
          <div className="controls">
            <span id="cerrar" className="cerrar" onClick={handleClose}>
              <FaTimesCircle /> {/* Icono de Cerrar */}
            </span>
          </div>
          <img
            id="imgExpandida"
            src={imagenExpandida}
            alt="Imagen expandida"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default GaleriaCliente;
