import React from "react";

function P2WizardArtista({ formData, setFormData }) {
  return (
    <div className="p1-container">
      <label htmlFor="NombreArt">Pseudonimo:</label>
      <input
        type="text"
        name="NombreArt"
        placeholder="nombre..."
        value={formData.nombreArt}
        maxLength={90}
        onChange={(event) =>
          setFormData({ ...formData, nombreArt: event.target.value })
        }
      />
      <label htmlFor="DescripcionArtista">Descripcion:</label>
      <textarea
        name="DescripcionArtista"
        placeholder="Numero Identificacion..."
        rows="4" cols="50"
        maxLength={900}
        value={formData.nroIdentificacion}
        onChange={(event) =>
          setFormData({ ...formData, nroIdentificacion: event.target.value })
        }
      />
     
    </div>
  );
}

export default P2WizardArtista;