import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../estilos/membresiaedit.css';
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";

const MembresiaADMINEdit = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [formData, setFormData] = useState({
    texto: "",
    opcion1: "",
    email: "",
    fecha: "",
    contraseña: "",
    opcion2: "",
    aceptaTerminos: false,
  });

  // Simula cargar datos de una API o estado inicial si es necesario
  useEffect(() => {
    if (id) {
      // Aquí puedes cargar los datos asociados al ID desde el backend
      console.log(`Cargar datos para la membresía con ID: ${id}`);
      setFormData({
        texto: "Ejemplo de texto",
        opcion1: "opcionA",
        email: "ejemplo@email.com",
        fecha: "2024-11-25",
        contraseña: "123456",
        opcion2: "opcionB",
        aceptaTerminos: true,
      });
    }
  }, [id]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Editar Membresía: ID {id}</h1>
      <div className="form-content">
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            type="text"
            name="texto"
            placeholder="Texto"
            className="input"
            value={formData.texto}
            onChange={handleChange}
          />
          <select
            name="opcion1"
            className="select"
            value={formData.opcion1}
            onChange={handleChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="opcionA">Opción A</option>
            <option value="opcionB">Opción B</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fecha"
            className="date"
            value={formData.fecha}
            onChange={handleChange}
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            className="input"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <select
            name="opcion2"
            className="select"
            value={formData.opcion2}
            onChange={handleChange}
          >
            <option value="">Otra selección</option>
            <option value="opcionB">Opción 1</option>
            <option value="opcionC">Opción 2</option>
          </select>
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
            />
            Acepto los términos
          </label>
          <button type="submit" className="button">
            Guardar cambios
          </button>
        </form>
        <div className="image-container">
          <img src="ruta/a/imagen.jpg" alt="Imagen" className="form-image" />
        </div>
      </div>
    </div>
  );
};

export default MembresiaADMINEdit;
