import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/membresiaedit.css";

const MembresiaADMINEdit = () => {
  const { id } = useParams(); // Captura el id de la URL
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    nivel: "",
    precioMensual: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    duracion: "",
    publicar: false,
    beneficiosSeleccionados: [],
  });
  const [beneficios, setBeneficios] = useState([]); // Beneficios disponibles
  const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito/error
  const [loading, setLoading] = useState(true); // Iniciar con "Cargando..."

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Cargar los beneficios
        const beneficiosResponse = await fetchApiM2(ENDPOINTS.GET_BENEFICIOS);
        const opcionesBeneficios = Array.isArray(beneficiosResponse)
          ? beneficiosResponse.map((beneficio) => ({
              value: beneficio.idBeneficio,
              label: beneficio.nombre,
            }))
          : [];

        setBeneficios(opcionesBeneficios);

        // Cargar los datos de la membresía
        const membresiaResponse = await fetchApiM2(
          ENDPOINTS.GET_MEMBRESIAS_POR_ID.replace("{idMembresia}", id)
        );

        if (membresiaResponse) {
          const fechaFormateadaC = new Date(membresiaResponse.fechaCreacion)
            .toISOString()
            .split("T")[0];
          const fechaFormateadaV = new Date(membresiaResponse.fechaVencimiento)
            .toISOString()
            .split("T")[0];

          // Manejar beneficios seleccionados
          const beneficiosSeleccionados = membresiaResponse.beneficios
            ?.split(",") // Dividir por comas
            .map((nombre) => nombre.trim()) // Eliminar espacios
            .map((nombre) =>
              opcionesBeneficios.find((b) => b.label === nombre) || null
            )
            .filter((b) => b !== null); // Filtrar valores nulos

          setFormData({
            nivel: membresiaResponse.nivel,
            precioMensual: membresiaResponse.precioMensual,
            fechaCreacion: fechaFormateadaC,
            fechaVencimiento: fechaFormateadaV,
            duracion: membresiaResponse.duracion,
            publicar: membresiaResponse.publicar,
            beneficiosSeleccionados,
          });
        } else {
          setMensaje("Membresía no encontrada.");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setMensaje("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBeneficiosChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      beneficiosSeleccionados: selectedOptions || [], // Actualiza los beneficios seleccionados
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validar datos
  if (
    !formData.nivel ||
    !formData.precioMensual ||
    !formData.fechaCreacion ||
    !formData.fechaVencimiento ||
    !formData.duracion
  ) {
    setMensaje("Por favor, completa todos los campos.");
    return;
  }

  setLoading(true);
  try {
    const dataToSend = {
      ...formData,
      BeneficiosIds: formData.beneficiosSeleccionados.map((b) => b.value), // Renombrado a "BeneficiosIds"
    };

    // Realizar el PUT para actualizar los datos
    const response = await fetchApiM2(
      ENDPOINTS.UPDATE_MEMBRESIA.replace("{idMembresia}", id),
      "PUT",
      dataToSend,
      {
        "Content-Type": "application/json",
      }
    );

    if (response.ok) {
      setMensaje("Membresía actualizada exitosamente!");
      navigate("/pages/membresiacon"); // Redirige al listado de membresías
    } else {
      const error = await response.json();
      setMensaje(
        `Error: ${error.message || "No se pudo actualizar la membresía"}`
      );
    }
  } catch (error) {
    //setMensaje("Error al conectar con el servidor.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="form-container">
      <h1 className="form-title">Editar membresía</h1>
      <div className="form-content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nivel" className="form-label">
                Nivel
              </label>
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
              <label htmlFor="precioMensual" className="form-label">
                Precio mensual
              </label>
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
              <label htmlFor="fechaCreacion" className="form-label">
                Fecha de creación
              </label>
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
              <label htmlFor="fechaVencimiento" className="form-label">
                Fecha de vencimiento
              </label>
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
              <label htmlFor="duracion" className="form-label">
                Duración (en meses)
              </label>
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
              <label htmlFor="beneficios" className="form-label">
                Selecciona los beneficios
              </label>
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

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Cargando..." : "Guardar cambios"}
            </button>
          </form>
        )}
        <div className="image-container">
          <img
            src="https://tiusr39pl.cuc-carrera-ti.ac.cr/images/Tatto2.jpeg"
            alt="Imagen"
            className="form-image"
          />
        </div>
      </div>
    </div>
  );
};

export default MembresiaADMINEdit;
