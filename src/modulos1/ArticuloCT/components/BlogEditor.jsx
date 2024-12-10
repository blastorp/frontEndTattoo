import React, { useState } from "react";
import styled from 'styled-components';
const BlogEditor = ({elements, setElements}) => {
//   const [elements, setElements] = useState([]);

  // Función para agregar un nuevo elemento
  const addElement = (type) => {
    const newElement = {
      idHijo: null,
      idArticulo: null,
      tipo: type,
      contenido: "",
      posicion: elements.length,
    };
    setElements([...elements, newElement]);
  };

  // Función para actualizar el contenido de un elemento
  const updateElement = (index, key, value) => {
    const updatedElements = elements.map((el, idx) =>
      idx === index ? { ...el, [key]: value } : el
    );
    setElements(updatedElements);
  };

  // Función para eliminar un elemento
  const removeElement = (index) => {
    const updatedElements = elements
      .filter((_, idx) => idx !== index)
      .map((el, idx) => ({ ...el, posicion: idx })); // Actualizar posiciones después de eliminar
    setElements(updatedElements);
  };

  // Función para mover un elemento hacia arriba
  const moveElementUp = (index) => {
    if (index > 0) {
      const updatedElements = [...elements];
      // Intercambiar posiciones
      const temp = updatedElements[index];
      updatedElements[index] = { ...updatedElements[index - 1], posicion: index };
      updatedElements[index - 1] = { ...temp, posicion: index - 1 };
      setElements(updatedElements);
    }
  };

  // Función para mover un elemento hacia abajo
  const moveElementDown = (index) => {
    if (index < elements.length - 1) {
      const updatedElements = [...elements];
      // Intercambiar posiciones
      const temp = updatedElements[index];
      updatedElements[index] = { ...updatedElements[index + 1], posicion: index };
      updatedElements[index + 1] = { ...temp, posicion: index + 1 };
      setElements(updatedElements);
    }
  };

  // Renderizar inputs dinámicos
  const renderElement = (element, index) => {
    if (element.tipo === "parrafo" ) {
      return (
        <textarea 
          key={`textarea-${index}`}
          value={element.contenido}
          placeholder={`Escribe tu ${element.tipo}`}
          maxLength={2000}
          className="textarea-parrafo"
          onChange={(e) => updateElement(index, "contenido", e.target.value)}
        />
      );
    }
    if (element.tipo === "subtitulo") {
        return (
          <textarea
            key={`textarea-${index}`}
            value={element.contenido}
            placeholder={`Escribe tu ${element.tipo}`}
            maxLength={200}
            className="textarea-subtitulo"
            onChange={(e) => updateElement(index, "contenido", e.target.value)}
          />
        );
      }
    if (element.tipo === "imagen") {
      return (
        <div className="contenedor-imagen-inputfile" key={`image-${index}`}>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              const url = file ? URL.createObjectURL(file) : "";
              updateElement(index, "contenido", url);
            }}
          />
          {element.contenido && (
            <img
              src={element.contenido}
              alt={`Preview ${index}`}
              style={{ maxWidth: "300px", marginTop: "10px" }}
              className="img-foto"
            />
          )}
        </div>
      );
    }
  };

  return (
    <StyledWrapper>
    <div className="contenedor-editor" id="contenedor">
        <div className="contenedor-sticky">
        <h1 className="titulo-editor">Editor de Contenido</h1>
      <div className="contenedor-botones-add">
        <button className="btn-add-parrafo" onClick={() => addElement("parrafo")}>Agregar Párrafo</button>
        <button className="btn-add-subtitulo" onClick={() => addElement("subtitulo")}>
          Agregar Subtítulo
        </button>
        <button className="btn-add-imagen" onClick={() => addElement("imagen")}>Agregar Imagen</button>
      </div>
        </div>
      
      <div className="conetenedor-todos-elementos">
        {elements.map((element, index) => (
          <div  className={`contenedor-one-elemento-${element.tipo}`} key={`element-${index}`} style={{ marginBottom: "20px" }}>
            <h3 className="titulo-one-elemento">{`Elemento ${index + 1} (${element.tipo})`}</h3>
            {renderElement(element, index)}
            <div className="contenedor-btn-accion" style={{ marginTop: "10px" }}>
              <button className="btn-delete-elemento" onClick={() => moveElementUp(index)}>Subir</button>
              <button className="btn-one-up" onClick={() => moveElementDown(index)}>Bajar</button>
              <button className="btn-one-down" onClick={() => removeElement(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(elements, null, 2)}</pre>
    </div>
    </StyledWrapper>
    
  );
};



const StyledWrapper = styled.div`
/* Contenedor Sticky */

.contenedor-editor{
max-width:700px;
}

.contenedor-sticky {
    width: 95%;
    justify-self: center;
    position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--oscuro-color);
  padding: 15px;
  z-index: 10;
  
  border: #D3D6DB 1px solid;
  border-radius: 5px;
}

.titulo-editor {
  margin: 10px 0;
  font-size: 1.5rem;
  text-align: center;
}

.contenedor-botones-add {
  display: flex;
  justify-content: center;
  gap: 12px;
}

button {
  width: 200px;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 5px;
  transition: opacity 0.2s ease;
}

button:hover {
  opacity: 0.8;
}

.btn-add-parrafo {
  background-color: green;
  color: white;
}

.btn-add-subtitulo {
  background-color: skyblue;
  color: white;
}

.btn-add-imagen {
  background-color: #d2691e; /* Terracota */
  color: white;
}



/* Contenedor de Elementos */
.conetenedor-todos-elementos {
  display: flex;
  
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.contenedor-one-elemento-parrafo {
  display: flex;
  flex-direction: column;
  border: green solid 2px;
  border-radius: 5px;
  padding: 15px;
  background: var(--SecundarioIntermedio-color);
  color: var(--Secundariogris-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.contenedor-one-elemento-subtitulo {
  display: flex;
  flex-direction: column;
  border: skyblue solid 2px;
  border-radius: 5px;
  padding: 15px;
  background: var(--SecundarioIntermedio-color);
  color: var(--Secundariogris-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.contenedor-one-elemento-imagen {
  display: flex;
  flex-direction: column;
  border: #d2691e solid 2px;
  border-radius: 5px;
  padding: 15px;
  background: var(--SecundarioIntermedio-color);
  color: var(--Secundariogris-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.titulo-one-elemento {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: var(--Secundariogris-color);
}

/* Botones de acción */
.contenedor-btn-accion  {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.btn-delete-elemento,
.btn-one-up,
.btn-one-down {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

.btn-delete-elemento:hover,
.btn-one-up:hover,
.btn-one-down:hover {
  color: black;
}

.contenedor-imagen-inputfile{
display: flex;
flex-direction: column;
justify-conte
}

textarea {
max-width: 600px;}
    
`;

export default BlogEditor;
