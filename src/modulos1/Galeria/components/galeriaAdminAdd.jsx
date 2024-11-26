import React, { useState } from "react";
import '../estilos/galeriaadd.css';

const GaleriaADMINAdd = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const artistas = [
        "Seleccionar artista",
        "Artista 1",
        "Artista 2",
        "Artista 3",
    ]; 

    const categorias = [
        "Seleccionar...",
        "Seleccionar...",
        "Seleccionar...",
        "Seleccionar...",
        "Seleccionar...",
        "Seleccionar...",
    ]; 

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
            <h1 className="form-title">Añadir imagen</h1>
            <div className="form-layout">
                {/* Imagen al lado del formulario */}
                <div className="image-container">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                        <div className="placeholder">Vista Previa</div>
                    )}
                </div>
                
                {/* Formulario */}
                <form className="form-container">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="input1">Nombre del tatuaje</label>
                            <input type="text" id="input1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="artista">Nombre artista</label>
                            <select id="artista">
                                {artistas.map((artista, index) => (
                                    <option key={index} value={artista}>
                                        {artista}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                    {/* Selector de categorías */}
                    <div className="form-group">
                        <label>Categorías</label>
                        <div className="select-group">
                            {categorias.map((categoria, index) => (
                                <div key={index} className="select-container">
                                    <select id={`categoria${index + 1}`}>
                                        <option value="">{categoria}</option>
                                    </select>
                                </div>
                            ))}
                        </div>
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
