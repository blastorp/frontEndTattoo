import React, { useState } from "react";
import "../estilos/palabrasvetadasaddedit.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import { useNavigate } from "react-router-dom";

const PalabrasVetadasADMINAdd = () => {
  const hoy = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    palabra: "",
    fecha: hoy,
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.palabra) {
      setMensaje("Por favor, ingresa una palabra.");
      return;
    }

    console.log("Datos a enviar al backend:", formData);

    setLoading(true);
    try {
      const response = await fetchApiM2(
        ENDPOINTS.CREATE_PALABRAS_VETADAS,
        "POST",
        {
          Palabra: formData.palabra,
          Fecha: formData.fecha,
        },
        { "Content-Type": "application/json" }
      );

      setMensaje("Palabra vetada añadida exitosamente!");

      setFormData({
        palabra: "",
        fecha: hoy,
      });

      navigate("/pages/palabrasvetadascon");
    } catch (error) {
      setMensaje(`Error: ${error.message || "No se pudo añadir la palabra vetada."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Añadir Palabra Vetada</h1>
      <div className="form-content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="palabra" className="form-label">Palabra</label>
              <input
                type="text"
                id="palabra"
                name="palabra"
                className="input"
                value={formData.palabra}
                onChange={handleChange}
                placeholder="Escribe la palabra"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha" className="form-label">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                className="date"
                value={formData.fecha}
                readOnly
              />
            </div>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Añadiendo..." : "Añadir Palabra"}
            </button>
          </form>
        )}

        <div className="image-container">
          <img
            src="https://tiusr39pl.cuc-carrera-ti.ac.cr/images/PalabrasVetadas.jpeg"
            alt="Imagen"
            className="form-image"
          />
        </div>
      </div>
    </div>
  );
};

export default PalabrasVetadasADMINAdd;
