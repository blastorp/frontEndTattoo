import React from "react";
import '../estilos/wizard.css'

function P1WizardArtista({ formData, setFormData }) {
  return (
    <div className="p1-container">
      <input
        type="text"
        placeholder="nombre..."
        value={formData.nombre}
        onChange={(event) =>
          setFormData({ ...formData, nombre: event.target.value })
        }
      />
      
      <input
        type="text"
        placeholder="Numero Identificacion..."
        value={formData.nroIdentificacion}
        onChange={(event) =>
          setFormData({ ...formData, nroIdentificacion: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="telefono..."
        value={formData.telefono}
        onChange={(event) =>
          setFormData({ ...formData, telefono: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="email..."
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="nombreArt..."
        value={formData.nombreArt}
        onChange={(event) =>
          setFormData({ ...formData, nombreArt: event.target.value })
        }
      />
    </div>
  );
}

export default P1WizardArtista;