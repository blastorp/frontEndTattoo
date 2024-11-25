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
        <div className="imagen" onClick={() => handleImageClick('https://lh3.googleusercontent.com/proxy/vCgchtPF6jeqgtnSer80D5FAJfeBrsB_cZk9iKLnnk6TlGPVbicLk8I5uT0rrPTBSE8cAzG7PG30PQLGTKAw6wVepT5x_KRxcyZx1ox2cRRw6ddo4fIe33AmDcCsllYJd-S0_eYOFvJJRjX1EpUoyFk7GWBjCcB8CPqrwU6TPBwbbtXLmQ')}>
          <img src="https://lh3.googleusercontent.com/proxy/vCgchtPF6jeqgtnSer80D5FAJfeBrsB_cZk9iKLnnk6TlGPVbicLk8I5uT0rrPTBSE8cAzG7PG30PQLGTKAw6wVepT5x_KRxcyZx1ox2cRRw6ddo4fIe33AmDcCsllYJd-S0_eYOFvJJRjX1EpUoyFk7GWBjCcB8CPqrwU6TPBwbbtXLmQ" alt="TempleOfInk" />
        </div>
        <div className="imagen" onClick={() => handleImageClick('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpXj50NVG2G7QldsGnpPqfa3WEwntwXhMcDA&s')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpXj50NVG2G7QldsGnpPqfa3WEwntwXhMcDA&s" alt="TempleOfInk" />
        </div>
        <div className="imagen" onClick={() => handleImageClick('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFaKNVFe6Qf26w6fxL96SzDriqcWEh6wCjQ&s')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFaKNVFe6Qf26w6fxL96SzDriqcWEh6wCjQ&s" alt="TempleOfInk" />
        </div>
        <div className="imagen" onClick={() => handleImageClick('https://content.clara.es/medio/2023/05/22/tatuaje-brujula-minimalista_6cfa6b49_230522213108_1200x630.jpg')}>
          <img src="https://content.clara.es/medio/2023/05/22/tatuaje-brujula-minimalista_6cfa6b49_230522213108_1200x630.jpg" alt="TempleOfInk" />
        </div>
        <div className="imagen" onClick={() => handleImageClick('https://cdn.domestika.org/c_fill,dpr_auto,f_auto,q_auto,w_1200/v1606814404/blog-post-open-graph-covers/000/005/917/5917-original.png?1606814404')}>
          <img src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,q_auto,w_1200/v1606814404/blog-post-open-graph-covers/000/005/917/5917-original.png?1606814404" alt="TempleOfInk" />
        </div>
        <div className="imagen" onClick={() => handleImageClick('https://www.avantgardetattoo.es/storage/2020/03/1-scaled.jpg')}>
          <img src="https://www.avantgardetattoo.es/storage/2020/03/1-scaled.jpg" alt="TempleOfInk" />
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