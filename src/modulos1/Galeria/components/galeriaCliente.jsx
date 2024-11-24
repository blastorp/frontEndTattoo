import React, { useState } from "react";
import "../estilos/galeria.css";

const GaleriaCliente = () => {
  const [zoom, setZoom] = useState(1);
  const [imagenExpandida, setImagenExpandida] = useState(null);

  const handleImageClick = (src) => {
    setImagenExpandida(src);
  };

  const handleClose = () => {
    setImagenExpandida(null);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => (prevZoom > 0.1 ? prevZoom - 0.1 : 0.1));
  };

  return (
    <div>
      <h1>Galería</h1>
      <section className="filtros">
        <ul>
          <li><button data-filter="Estilo">Estilo</button></li>
          <li><button data-filter="Artista">Artista</button></li>
          <li><button data-filter="Concepto">Concepto</button></li>
        </ul>
      </section>

      <section className="galeria">
        {/* Asegúrate de colocar imágenes con diferentes categorías aquí */}
        <div className="imagen" onClick={() => handleImageClick('assets/logo_TOI.png')}>
          <img src="../assets/logo_TOI.png" alt="TempleOfInk" />
        </div>
        {/* Más imágenes */}
      </section>

      {imagenExpandida && (
        <div id="imagenExpandida" className="imagen-expandida">
          <div className="controls">
            <button id="zoomIn" className="zoom-btn" onClick={handleZoomIn}>
              {/* Icono de Zoom In de Bootstrap */}
              <i className="bi bi-search-plus" style={{ fontSize: '50px', color: 'white' }}></i>
            </button>
            <button id="zoomOut" className="zoom-btn" onClick={handleZoomOut}>
              {/* Icono de Zoom Out de Bootstrap */}
              <i className="bi bi-search-minus" style={{ fontSize: '50px', color: 'white' }}></i>
            </button>
            <span id="cerrar" className="cerrar" onClick={handleClose}>
              {/* Icono de cerrar (X) de Bootstrap */}
              <i className="bi bi-x-circle" style={{ fontSize: '50px', color: 'white' }}></i>
            </span>
          </div>
          <img
            id="imgExpandida"
            src={imagenExpandida}
            alt="Imagen expandida"
            style={{ transform: `scale(${zoom})`, maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default GaleriaCliente;
