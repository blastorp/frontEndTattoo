import React from "react";

const BlogRenderer = ({ elements }) => {
  return (
    <div className="blog-container" style={{ maxWidth: "800px", margin: "auto" }}>
      {elements
        .sort((a, b) => a.posicion - b.posicion) // Asegurar el orden por posición
        .map((element, index) => {
          if (element.tipo === "imagen") {
            return (
              <div key={`image-${index}`} className="blog-image-container">
                <img
                  src={element.contenido}
                  alt={`Imagen ${index + 1}`}
                  className="blog-image"
                  style={{
                    maxWidth: "100%",
                    width: "500px",
                    display: "block",
                    margin: "20px auto",
                  }}
                />
              </div>
            );
          }
          if (element.tipo === "subtitulo") {
            return (
              <h4
                key={`subtitle-${index}`}
                className="blog-subtitle"
                style={{
                  fontWeight: "bold",
                  color: "var(--rojo-color)",
                  margin: "20px 0 10px",
                }}
              >
                {element.contenido || "Subtítulo vacío"}
              </h4>
            );
          }
          if (element.tipo === "parrafo") {
            return (
              <p
                key={`paragraph-${index}`}
                className="blog-paragraph"
                style={{
                  textAlign: "justify",
                  textIndent: "2em",
                  lineHeight: "1.6",
                  margin: "10px 0",
                }}
              >
                {element.contenido || "Contenido vacío"}
              </p>
            );
          }
          return null; // Si el tipo no es reconocido
        })}
    </div>
  );
};

export default BlogRenderer;
