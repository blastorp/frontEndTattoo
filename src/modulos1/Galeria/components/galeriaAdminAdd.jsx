import React, { useState } from "react";
import '../estilos/galeriaadd.css'; 

const GaleriaADMINAdd = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="container">
        <h1 className="form-title">Formulario con Vista Previa</h1>
        <div className="form-layout">
          <div className="image-container">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <div className="placeholder">Vista Previa</div>
            )}
          </div>
          <form className="form-container">
            <div className="form-group">
              <label htmlFor="input1">Nombre del tatuaje</label>
              <input type="text" id="input1" />
            </div>
            <div className="form-group">
              <label htmlFor="input2">Nombre artista</label>
              <input type="text" id="input2" />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" />
                Publicar
              </label>
            </div>
            <div className="form-group">
              <button type="button" onClick={() => document.getElementById("fileInput").click()}>
                Subir imagen
              </button>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            <div className="button-group">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
export default GaleriaADMINAdd;