import React from "react";
import { useState, useEffect } from "react";
import '../estilos/wizard.css'


function P2WizardArtista({ formData, setFormData,  setImageUpload }) {

 
  // const [imageUrls, setImageUrls] = useState([]);
  const [image, setImage] = useState(null)

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageUpload(event.target.files[0])

    }
   }


  return (
    <div className="p1-container">
      <label htmlFor="NombreArt">Pseudonimo:</label>
      <input
        type="text"
        name="NombreArt"
        placeholder="nombre..."
        value={formData.nombreArt}
        maxLength={90}
        onChange={(event) =>
          setFormData({ ...formData, nombreArt: event.target.value })
        }
      />
      <label htmlFor="DescripcionArtista">Descripcion:</label>
      <textarea
        name="DescripcionArtista"
        placeholder="Descripcion Artista..."
        rows="4" cols="50"
        maxLength={900}
        value={formData.nroIdentificacion}
        onChange={(event) =>
          setFormData({ ...formData, nroIdentificacion: event.target.value })
        }
      />
<label htmlFor="Foto Perfil">Elegir Foto Perfil</label>

     <input name="Foto Perfil"
      type="file" 
      onChange={onImageChange}
       className="filetype" 
        accept="image/png, image/gif, image/jpeg"/>
     <img className="fotoPerfil" alt="Foto Perfil image" src={image} />
     {/* dar formato css */}
    </div>
  );
}

export default P2WizardArtista;