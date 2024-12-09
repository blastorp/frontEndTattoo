import React, { useState } from "react";

const BlogEditor = () => {
  const [elements, setElements] = useState([]);

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
    const updatedElements = elements.filter((_, idx) => idx !== index);
    setElements(updatedElements);
  };

  // Renderizar inputs dinámicos
  const renderElement = (element, index) => {
    if (element.tipo === "parrafo" || element.tipo === "subtitulo") {
      return (
        <textarea
          key={index}
          value={element.contenido}
          placeholder={`Escribe tu ${element.tipo}`}
          onChange={(e) => updateElement(index, "contenido", e.target.value)}
        />
      );
    }
    if (element.tipo === "imagen") {
      return (
        <input
          key={index}
          type="file"
          onChange={(e) =>
            updateElement(index, "contenido", e.target.files[0]?.name || "")
          }
        />
      );
    }
  };

  return (
    <div>
      <h1>Editor de Blog</h1>
      <div>
        <button onClick={() => addElement("parrafo")}>Agregar Párrafo</button>
        <button onClick={() => addElement("subtitulo")}>
          Agregar Subtítulo
        </button>
        <button onClick={() => addElement("imagen")}>Agregar Imagen</button>
      </div>
      <div>
        {elements.map((element, index) => (
          <div key={index}>
            <h3>{`Elemento ${index + 1} (${element.tipo})`}</h3>
            {renderElement(element, index)}
            <button onClick={() => removeElement(index)}>Eliminar</button>
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(elements, null, 2)}</pre>
    </div>
  );
};

export default BlogEditor;
