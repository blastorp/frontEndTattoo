
import React from 'react'

function P1WizardCategoria({ formData, setFormData,  setImageUpload, image, setImage, imageUpload }) {
  
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
          name="nombre"
          placeholder="nombre..."
          value={formData.nombre}
          maxLength={90}
          onChange={(event) =>
            setFormData({ ...formData, nombre: event.target.value })
          }
        />
       
        <label htmlFor="DescripcionCategoria">Descripcion:</label>
        <textarea
          name="DescripcionCategoria"
          placeholder="Descripcion Categoria..."
          rows="4" cols="50"
          maxLength={900}
          value={formData.descripcion}
          onChange={(event) =>
            setFormData({ ...formData, descripcion: event.target.value })
          }
        />
  <label htmlFor="Foto Perfil">Elegir Imagen Categoria</label>
  
       <input name="Foto Perfil"
        type="file" 
        onChange={onImageChange}
         className="filetype" 
          accept="image/png, image/gif, image/jpeg"/>
       <img className="fotoPerfil" alt="Foto Categoria image" src={ image } />
       {/* dar formato css */}
      </div>
  )
}

export default P1WizardCategoria