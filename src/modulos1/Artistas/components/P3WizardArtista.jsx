import React from "react";

function P3WizardArtista({ formData, setFormData, categorias, categoriasElegidas, setcategoriasElegidas }) {
  const handleCheckboxChange = (item) => {
    setcategoriasElegidas((prev) => {
      if (prev.includes(item.IdCategoria)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter((id) => id !== item.IdCategoria);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prev, item.IdCategoria];
      }
    });
  };

  return (
    <div className="other-info-container">
      {categorias.map((item) => (
        <div key={item.IdCategoria}>
          <label htmlFor={item.nombre}>{item.nombre}</label>
          <input
            type="checkbox"
            id={item.nombre}
            name={item.nombre}
            checked={categoriasElegidas.includes(item.IdCategoria)} // Marca el checkbox si ya está seleccionado
            onChange={() => handleCheckboxChange(item)} // Maneja el cambio de estado
          />
        </div>
      ))}
    </div>
  );
}

export default P3WizardArtista;