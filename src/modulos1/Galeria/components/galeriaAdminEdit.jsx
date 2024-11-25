import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../estilos/galeriaedit.css';

const EditarPagina = () => {
    const { id } = useParams(); 
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
            <h1 className="form-title">Editar tatuaje ID:{id}</h1>
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
                        <label htmlFor="tattooName">Nombre del tatuaje</label>
                        <input type="text" id="tattooName" placeholder="Ej. Realismo en brazo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="artistName">Nombre artista</label>
                        <input type="text" id="artistName" placeholder="Ej. John Doe" />
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
                        <button type="submit">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarPagina;
