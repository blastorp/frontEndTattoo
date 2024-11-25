import React, { useState } from "react";
import "../estilos/galeria.css";
import {FaTimesCircle } from "react-icons/fa"; // Usamos react-icons

const GaleriaCliente = () => {
  const [imagenExpandida, setImagenExpandida] = useState(null);

  const handleImageClick = (src) => {
    setImagenExpandida(src);
  };

  const handleClose = () => {
    setImagenExpandida(null);
  };


  return (
    <div>
      <h1>Galería</h1>
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

      <section className="galeria">
        <div className="imagen" onClick={() => handleImageClick('https://wildwomantattoo.com/wp-content/uploads/2021/09/Tatuaje-Li%CC%81nea-fina-010_s1500.jpg')}>
          <img src="https://wildwomantattoo.com/wp-content/uploads/2021/09/Tatuaje-Li%CC%81nea-fina-010_s1500.jpg" alt="TempleOfInk" />
        </div>
      </section>

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