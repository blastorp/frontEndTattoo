import React from "react";

function P3WizardArtista({ formData, setFormData, categorias, categoriasElegidas, setcategoriasElegidas }) {
  const handleCheckboxChange = (item) => {
    setcategoriasElegidas((prev) => {
      if (prev.includes(item.idCategoria)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter((id) => id !== item.idCategoria);
      } else {
        // Si no está seleccionado, lo agregamos
        
        return [...prev, item.idCategoria];
        
      }
      
    });
  };

  return (
    <div className="p3-container">
      {categorias.map((item) => (
        <div key={item.IdCategoria}>
          <label htmlFor={item.nombre}>{item.nombre}</label>
          <input
            type="checkbox"
            id={item.idCategoria}
            value={item.idCategoria}
            name={item.nombre}
            checked={categoriasElegidas.includes(item.idCategoria)} // Marca el checkbox si ya está seleccionado
            onChange={() => handleCheckboxChange(item)} // Maneja el cambio de estado
          />
        </div>
      ))}
    </div>
  );
}

export default P3WizardArtista;