import React, { useState } from "react";
import "../estilos/testimonio.css";

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
    <div style={{ margin: "120px 20px" }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "40px auto", padding: "15px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="correo" required />

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
                style={{ fontSize: "24px", cursor: "pointer", color: selectedRating >= star ? "gold" : "#ccc" }}
              >
                ★
              </label>
            </React.Fragment>
          ))}
        </div>

        <button type="submit" style={{ backgroundColor: "#DA0037", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}>
          Enviar Testimonio
        </button>
      </form>
    </div>
  );
};

export default TestimoniosClientes;
