import React, { useState } from "react";
import "../estilos/testimonio.css";
//import fetchApiM2  from "../../../services/api/fetchApiM2";
//import ENDPOINTS  from "../../../services/api/endpoints";

const TestimoniosClientes = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      nombre: formData.get("nombre"),
      correo: formData.get("correo"),
      testimonio: formData.get("testimonio"),
      rating: selectedRating,
    };
    console.log("Datos enviados:", data);
  };

  return (
    <div>
      {/* Título centrado fuera del formulario */}
      <h2 className="titulo">Nuevo Testimonio</h2>

      <div className="form-container">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="testimonio-form">
          {/* Contenedor de Nombre y Correo en la misma línea */}
          <div className="input-group">
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>
            <div>
              <label htmlFor="correo">Correo Electrónico:</label>
              <input type="email" id="correo" name="correo" required />
            </div>
          </div>

          <label htmlFor="testimonio">Testimonio:</label>
          <textarea id="testimonio" name="testimonio" rows="4" required></textarea>

          <label>Calificación:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  onChange={() => handleRatingClick(star)}
                  checked={selectedRating === star}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor={`star${star}`}
                  className={selectedRating >= star ? "selected" : ""}
                  onClick={() => handleRatingClick(star)}
                >
                  ★
                </label>
              </React.Fragment>
            ))}
          </div>

          <button type="submit">Enviar Testimonio</button>
        </form>

        {/* Imagen */}
        <img
          src="https://via.placeholder.com/400"
          alt="Testimonios de clientes"
          className="testimonio-image"
        />
      </div>
    </div>
  );
};

export default TestimoniosClientes;
