import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import Select from "react-select";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const MembresiaADMINAdd = () => {
  const [formData, setFormData] = useState({
    nivel: "",
    precioMensual: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    duracion: "1",
    publicar: false,
    beneficiosSeleccionados: [],
  });

  const [beneficios, setBeneficios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Función para cargar beneficios
  const fetchBeneficios = async () => {
    try {
      const response = await fetchApiM2(ENDPOINTS.GET_BENEFICIOS);
      if (Array.isArray(response) && response.length > 0) {
        const opciones = response.map((beneficio) => ({
          value: beneficio.idBeneficio, 
          label: beneficio.nombre, 
        }));
        setBeneficios(opciones);
      } else {
        setMensaje("No se pudieron cargar los beneficios.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMensaje("Error al cargar los beneficios.");
    }
  };

  useEffect(() => {
    fetchBeneficios();
    setFormData((prevData) => ({
      ...prevData,
      fechaCreacion: new Date().toISOString().split("T")[0], // Fecha actual
    }));
  }, []);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejo de cambios en los beneficios seleccionados
  const handleBeneficiosChange = (selectedOptions) => {
    setFormData({
      ...formData,
      beneficiosSeleccionados: selectedOptions || [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar que los campos obligatorios estén completos
    if (
      !formData.nivel ||
      !formData.precioMensual ||
      !formData.fechaCreacion ||
      !formData.fechaVencimiento ||
      !formData.duracion
    ) {
      setMensaje("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    // Mostrar en consola los datos que se enviarán al backend
    console.log("Datos a enviar al backend:", {
      Nivel: formData.nivel,
      PrecioMensual: formData.precioMensual,
      FechaCreacion: formData.fechaCreacion,
      FechaVencimiento: formData.fechaVencimiento,
      Duracion: formData.duracion,
      Publicar: formData.publicar,
      BeneficiosIds: formData.beneficiosSeleccionados.map(b => b.value), // Beneficios seleccionados
    });
  
    try {
      // Enviar los datos al backend para crear la nueva membresía
      const response = await fetchApiM2(
        ENDPOINTS.CREATE_MEMBRESIA, // Endpoint para crear la membresía
        "POST",
        {
          Nivel: formData.nivel,
          PrecioMensual: formData.precioMensual,
          FechaCreacion: formData.fechaCreacion,
          FechaVencimiento: formData.fechaVencimiento,
          Duracion: formData.duracion,
          Publicar: formData.publicar,
          BeneficiosIds: formData.beneficiosSeleccionados.map(b => b.value),
        },
        { "Content-Type": "application/json" }
      );
  
      // Si la respuesta es exitosa, mostramos el mensaje de éxito
      setMensaje("¡Membresía creada exitosamente!");
  
      // Limpiar el formulario después de la creación
      setFormData({
        nivel: "",
        precioMensual: "",
        fechaCreacion: "",
        fechaVencimiento: "",
        duracion: "1",
        publicar: false,
        beneficiosSeleccionados: [],
      });
  
      // Redirigir a otra página si es necesario
      // navigate("/pages/membresias"); // Descomenta esta línea si necesitas redirigir a otra página
  
    } catch (error) {
      // En caso de error, mostrar mensaje de error
      setMensaje(`Error: ${error.message || "No se pudo crear la membresía."}`);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Nueva membresía</h1>
      <div className="form-content">
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nivel" className="form-label">Nivel</label>
            <input
              type="text"
              id="nivel"
              name="nivel"
              className="input"
              value={formData.nivel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="precioMensual" className="form-label">Precio mensual</label>
            <NumericFormat
              id="precioMensual"
              name="precioMensual"
              className="input"
              value={formData.precioMensual}
              onValueChange={(values) => {
                setFormData({ ...formData, precioMensual: values.value });
              }}
              thousandSeparator={true}
              prefix={"₡"}
              decimalScale={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaCreacion" className="form-label">Fecha de creación</label>
            <input
              type="date"
              id="fechaCreacion"
              name="fechaCreacion"
              className="input"
              value={formData.fechaCreacion}
              onChange={handleChange}
              disabled  
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              className="input"
              value={formData.fechaVencimiento}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duracion" className="form-label">Duración (en meses)</label>
            <select
              id="duracion"
              name="duracion"
              className="select"
              value={formData.duracion}
              onChange={handleChange}
            >
              <option value="1">1 mes</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="beneficios" className="form-label">Selecciona los beneficios</label>
            <Select
              isMulti
              options={beneficios}
              value={formData.beneficiosSeleccionados}
              onChange={handleBeneficiosChange}
              classNamePrefix="react-select"
              placeholder="Selecciona beneficios..."
            />
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="publicar"
                name="publicar"
                checked={formData.publicar}
                onChange={handleChange}
              />
              Publicar
            </label>
          </div>

          <button type="submit" className="button">Enviar</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div className="image-container">
          <img src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset4.avif?alt=media&token=c85c60a8-8f25-4122-9aee-b6959521be09" alt="Imagen" className="form-image" />
        </div>
      </div>
    </div>
  );
};

export default MembresiaADMINAdd;
