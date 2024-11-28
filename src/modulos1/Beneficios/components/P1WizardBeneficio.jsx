import React from 'react'

function P1WizardBeneficio({ formData, setFormData,  setImageUpload, image, setImage, imageUpload }) {
  
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setImageUpload(event.target.files[0]);
          
    
        }
       }
  
    return (
    
        <div className="p1-container">
        <label htmlFor="NombreArt">Nombre:</label>
        <input
          type="text"
          name="NombreArt"
          placeholder="nombre..."
          value={formData.nombreArt}
          maxLength={90}
          onChange={(event) =>
            setFormData({ ...formData, nombre: event.target.value })
          }
        />
        <label htmlFor="NombreArt">Subtitulo:</label>
        <input
          type="text"
          name="NombreArt"
          placeholder="nombre..."
          value={formData.nombreArt}
          maxLength={90}
          onChange={(event) =>
            setFormData({ ...formData, subtitulo: event.target.value })
          }
        />
        <label htmlFor="DescripcionArtista">Descripcion:</label>
        <textarea
          name="DescripcionArtista"
          placeholder="Descripcion Artista..."
          rows="4" cols="50"
          maxLength={900}
          value={formData.descripcionArt}
          onChange={(event) =>
            setFormData({ ...formData, descripcion: event.target.value })
          }
        />
  <label htmlFor="Foto Perfil">Elegir Foto Perfil</label>
  
       <input name="Foto Perfil"
        type="file" 
        onChange={onImageChange}
         className="filetype" 
          accept="image/png, image/gif, image/jpeg"/>
       <img className="fotoPerfil" alt="Foto Perfil image" src={ image } />
       {/* dar formato css */}
      </div>
  )
}

export default P1WizardBeneficio