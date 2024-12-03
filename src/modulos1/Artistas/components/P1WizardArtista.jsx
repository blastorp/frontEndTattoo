import React from "react";
import '../estilos/wizard.css'

function P1WizardArtista({ formData, setFormData }) {
  return (
    <div className="p1-container">
      <label htmlFor="Nombre">Nombre:</label>
      <input
        type="text"
        name="Nombre"
        placeholder="nombre..."
        value={formData.nombre}
        maxLength={90}
        onChange={(event) =>
          setFormData({ ...formData, nombre: event.target.value })
        }
      />
      <label htmlFor="Identificacion">Identificacion:</label>
      <input
        type="text"
        name="Identificacion"
        placeholder="Numero Identificacion..."
        maxLength={90}
        value={formData.nroIdentificacion}
        onChange={(event) =>
          setFormData({ ...formData, nroIdentificacion: event.target.value })
        }
      />
      <label htmlFor="telefono">Telefono:</label>
      <input
        type="text"
        name="telefono"
        placeholder="telefono..."
        maxLength={90}
        value={formData.telefono}
        onChange={(event) =>
          setFormData({ ...formData, telefono: event.target.value })
        }
      />
      <label htmlFor="email">Email:</label>
      <input
        type="mail"
        name="email"
        placeholder="email..."
        maxLength={90}
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }

      />
      {/* <label htmlFor="fechaCreacion">Fecha Ingreso:</label>
      <input
        type="date"
        name="fechaCreacion"
        placeholder="nombreArt..."
        
        value={formData.fechaCreacion}
        onChange={(event) =>
          setFormData({ ...formData, fechaCreacion: event.target.value })
        }
      /> */}
    </div>
  );
}

export default P1WizardArtista;