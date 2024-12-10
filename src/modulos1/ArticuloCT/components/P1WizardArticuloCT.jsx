
import React from 'react'
import BlogEditor from './BlogEditor';

function P1WizardArticuloCT({ formData, setFormData,  setImageUpload, image, setImage, elements, setElements }) {
  
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setImageUpload(event.target.files[0]);

        }
       }
  
    return (
    
        <div className="p1-container">
        <label htmlFor="NombreArt">Titulo Principal:</label>
        <input
          type="text"
          name="tituloPrincipal"
          placeholder="titulo Principal..."
          value={formData.tituloPrincipal}
          maxLength={90}
          onChange={(event) =>
            setFormData({ ...formData, tituloPrincipal: event.target.value })
          }
        />
        <label htmlFor="NombreArt">Titulo Corto:</label>
        <input
          type="text"
          name="tituloCorto"
          placeholder="titulo Corto..."
          value={formData.tituloCorto}
          maxLength={90}
          onChange={(event) =>
            setFormData({ ...formData, tituloCorto: event.target.value })
          }
        />
       
        <label htmlFor="DescripcionCategoria">Introducccion:</label>
        <textarea
          name="descripcionIntro"
          placeholder="Introduccion del articulo..."
          rows="4" cols="50"
          maxLength={900}
          value={formData.descripcionIntro}
          onChange={(event) =>
            setFormData({ ...formData, descripcionIntro: event.target.value })
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
          {/* <BlogEditor elements = {elements} setElements ={setElements}  /> */}
      </div>
  )
}

export default P1WizardArticuloCT