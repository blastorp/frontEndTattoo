import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../services/firebase/firebaseConn2"; 
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import Select from "react-select";
import "../estilos/galeriaedit.css";

const GaleriaADMINEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreTatuaje: "",
    artista: "",
    imagenTatuaje: "",
    publicar: false,
    subcategoriasSeleccionadas: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [imageError, setImageError] = useState(false);

  // Datos de selección
  const [artistas, setArtistas] = useState([]);
  const [estilos, setEstilos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [tamanos, setTamanos] = useState([]);
  const [colores, setColores] = useState([]);
  const [tematicas, setTematicas] = useState([]);
  const [categorias, setCategorias] = useState(Array.from({ length: 5 }, () => []));
  const [downloadURL, setDownloadURL] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          artistasResponse,
          estilosResponse,
          ubicacionesResponse,
          tamanosResponse,
          coloresResponse,
          tematicasResponse,
          galeriaResponse,
        ] = await Promise.all([
          fetchApiM2(ENDPOINTS.GET_ARTISTA_POR_IDNOMBRE),
          fetchApiM2(ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Estilos")),
          fetchApiM2(ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Ubicacion")),
          fetchApiM2(ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Tamano")),
          fetchApiM2(ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Color")),
          fetchApiM2(ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Tematica")),
          fetchApiM2(ENDPOINTS.GET_GALERIA_POR_ID.replace("{idTatuaje}", id)),
        ]);

        if (artistasResponse) setArtistas(artistasResponse);
        setEstilos(estilosResponse.map((item) => ({ value: item.nombre, label: item.nombre })));
        setUbicaciones(ubicacionesResponse.map((item) => ({ value: item.nombre, label: item.nombre })));
        setTamanos(tamanosResponse.map((item) => ({ value: item.nombre, label: item.nombre })));
        setColores(coloresResponse.map((item) => ({ value: item.nombre, label: item.nombre })));
        setTematicas(tematicasResponse.map((item) => ({ value: item.nombre, label: item.nombre })));

        if (galeriaResponse) {
          const subcategoriasSeleccionadas = galeriaResponse.subcategorias
            ?.split(",")
            .map((s) => s.trim());

          setFormData({
            nombreTatuaje: galeriaResponse.nombreTatuaje,
            artista: galeriaResponse.idArtista,
            imagenTatuaje: galeriaResponse.imagenTatuaje,
            publicar: galeriaResponse.publicar,
            subcategoriasSeleccionadas,
          });

          setImagePreview(galeriaResponse.imagenTatuaje);

          // Preseleccionar subcategorías
          const categoriasActualizadas = [
            estilosResponse.filter((item) => subcategoriasSeleccionadas.includes(item.nombre)),
            ubicacionesResponse.filter((item) => subcategoriasSeleccionadas.includes(item.nombre)),
            tamanosResponse.filter((item) => subcategoriasSeleccionadas.includes(item.nombre)),
            coloresResponse.filter((item) => subcategoriasSeleccionadas.includes(item.nombre)),
            tematicasResponse.filter((item) => subcategoriasSeleccionadas.includes(item.nombre)),
          ].map((categoria) => categoria.map((item) => ({ value: item.nombre, label: item.nombre })));

          setCategorias(categoriasActualizadas);
        }
      } catch (error) {
        setMensaje("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError(true);
        setMensaje("El archivo debe ser una imagen.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB
        setImageError(true);
        setMensaje("La imagen es demasiado grande. Máximo 2MB.");
        return;
      }

      setImageError(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imagenTatuaje: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoriaChange = (selectedOptions, index) => {
    const nuevasCategorias = [...categorias];
    nuevasCategorias[index] = selectedOptions;
    setCategorias(nuevasCategorias);

    const subcategoriasSeleccionadas = nuevasCategorias.flat().map((option) => option.value);
    setFormData({ ...formData, subcategoriasSeleccionadas });
  };

  const handleSubmitImage = async () => {
    setLoading(true);

    // Verifica si se ha seleccionado una imagen
    const fileInput = document.getElementById("imageTatuaje");
    const file = fileInput ? fileInput.files[0] : null;
    if (!file) {
        setMensaje("Debes seleccionar una imagen.");
        setLoading(false);
        return;
    }

    const storageRef = ref(storage, `gallery/${file.name}`);
    
    try {
        await uploadBytes(storageRef, file);
        const downloadURLTemp = await getDownloadURL(storageRef);
        setDownloadURL(downloadURLTemp);  // Establecer la URL de la imagen subida
        setMensaje("Imagen enviada exitosamente.");
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        setMensaje("Error al enviar la imagen.");
    } finally {
        setLoading(false);
    }
};

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      idTatuaje: id,
      nombreTatuaje: formData.nombreTatuaje,
      imagenTatuaje: formData.imagenTatuaje, 
      fechaPublicacion: new Date().toISOString(),
      idArtista: formData.artista,
      publicar: formData.publicar,
      subcategoriaIds: formData.subcategoriasSeleccionadas,
    };
    
    setLoading(true);
    try {
        const requestBody = {
          ...formData,
          subcategoriaIds: formData.subcategoriasSeleccionadas.map((subcat) => subcat.id), // Adaptado para "subcategoriaIds"
        };
      
        // Realizar el PUT para actualizar los datos
        const response = await fetchApiM2(
          ENDPOINTS.UPDATE_GALERIA.replace("{idTatuaje}", id),
          "PUT",
          requestBody,
          {
            "Content-Type": "application/json",
          }
        );
      
        if (response.ok) {
          setMensaje("Elemento actualizado exitosamente!");
          navigate("/pages/galeriacon"); // Redirige a la galería después de la actualización
        } else {
          const error = await response.json();
          setMensaje(
            `Error: ${error.message || "No se pudo actualizar el elemento."}`
          );
        }
      } catch (error) {
        setMensaje("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
      
        
  };

  return (
    <div className="container">
      <h1 className="form-title">Editar Imagen</h1>
      <div className="form-layout">
        <div className="image-container">
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Vista previa" className="image-preview" />
            </>
          ) : (
            <div className="placeholder">Vista Previa</div>
          )}
          {imageError && <p className="error-message">{mensaje}</p>}
        </div>
        <form className="form-container" onSubmit={handleSubmitForm}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombreTatuaje">Nombre del Tatuaje</label>
              <input
                type="text"
                id="nombreTatuaje"
                name="nombreTatuaje"
                value={formData.nombreTatuaje}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="artista">Nombre Artista</label>
              <select
                id="artista"
                name="artista"
                value={formData.artista}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar artista</option>
                {artistas.map((artista) => (
                  <option key={artista.idArtista} value={artista.idArtista}>
                    {artista.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <input
                type="checkbox"
                name="publicar"
                checked={formData.publicar}
                onChange={handleInputChange}
            />
            <label>Publicar</label>
          </div>          
          <div className="form-group button-group">
            <input
              type="file"
              id="imageTatuaje"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-group button-group">
                        <button type="button" onClick={handleSubmitImage}>Enviar imagen</button>
                    </div>
          <div className="form-row select-group">
            {[estilos, ubicaciones, tamanos, colores, tematicas].map((opciones, index) => (
              <div className="select-container" key={index}>
                <label>{["Estilos", "Ubicación", "Tamaño", "Color", "Temática"][index]}</label>
                <Select
                  isMulti
                  options={opciones}
                  value={categorias[index]}
                  onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, index)}
                />
              </div>
            ))}
          </div>
          <p>{mensaje}</p>
          <button type="submit" disabled={!imagePreview || imageError || loading}>
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default GaleriaADMINEdit;
