import React, { useState, useEffect } from "react";
import "../estilos/galeria.css";
import { FaTimesCircle } from "react-icons/fa";
import fetchApiM2 from "../../../services/api/fetchApiM2"; // Asegúrate de que fetchApiM2 esté configurado correctamente
import ENDPOINTS from "../../../services/api/endpoints"; // Asegúrate de que el endpoint esté correctamente definido

const GaleriaCliente = () => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenExpandida, setImagenExpandida] = useState(null);
  const [artistas, setArtistas] = useState([]); // Estado para los artistas
  const [estilos, setEstilos] = useState([]); // Estado para los estilos
  const [ubicaciones, setUbicaciones] = useState([]); // Estado para las ubicaciones
  const [tamanos, setTamanos] = useState([]); // Estado para los tamaños
  const [colores, setColores] = useState([]); // Estado para los colores
  const [tematicas, setTematicas] = useState([]); // Estado para las temáticas
  const [loading, setLoading] = useState(false); // Estado de carga
  const [mensaje, setMensaje] = useState(""); // Estado para mensajes de error o éxito

  useEffect(() => {
    const fetchArtistas = async () => {
      setLoading(true);
      try {
        const artistasResponse = await fetchApiM2(ENDPOINTS.GET_ARTISTA_POR_IDNOMBRE);
        if (artistasResponse) {
          setArtistas(artistasResponse);
        } else {
          setMensaje("No se pudieron cargar los artistas.");
        }
      } catch (error) {
        setMensaje("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubCategorias = async () => {
      setLoading(true);
      try {
        const [estilosResponse, ubicacionesResponse, tamanosResponse, coloresResponse, tematicasResponse] = await Promise.all([
          fetchApiM2(`${ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Estilos")}`),
          fetchApiM2(`${ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Ubicacion")}`),
          fetchApiM2(`${ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Tamano")}`),
          fetchApiM2(`${ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Color")}`),
          fetchApiM2(`${ENDPOINTS.GET_SUBCATEGORIAS.replace("{filtroNombre}", "Tematica")}`)
        ]);

        if (estilosResponse && ubicacionesResponse && tamanosResponse && coloresResponse && tematicasResponse) {
          setEstilos(estilosResponse.map(item => ({ value: item.idSubcategoria, label: item.nombre })));
          setUbicaciones(ubicacionesResponse.map(item => ({ value: item.idSubcategoria, label: item.nombre })));
          setTamanos(tamanosResponse.map(item => ({ value: item.idSubcategoria, label: item.nombre })));
          setColores(coloresResponse.map(item => ({ value: item.idSubcategoria, label: item.nombre })));
          setTematicas(tematicasResponse.map(item => ({ value: item.idSubcategoria, label: item.nombre })));
        } else {
          setMensaje("No se pudieron cargar las subcategorías.");
        }
      } catch (error) {
        setMensaje("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistas();
    fetchSubCategorias(); // Cargar las subcategorías al montar el componente

    // Obtener imágenes de la galería de cliente
    const fetchGaleriaCliente = async () => {
      setLoading(true);
      try {
        const response = await fetchApiM2(ENDPOINTS.GET_GALERIA_CLIENTE);
        if (Array.isArray(response)) {
          setImagenes(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setImagenes(response.data);
        } else {
          setMensaje("No se encontraron datos válidos en la respuesta.");
        }
      } catch (error) {
        setMensaje("Error al obtener la galería de cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleriaCliente();
  }, []);

  const handleImageClick = (src) => {
    setImagenExpandida(src);
  };

  const handleClose = () => {
    setImagenExpandida(null);
  };

  return (
    <div>
      <h1>Galería</h1>

      {/* Filtros */}
      <section className="filtros">
        <div className="filtro-item">
          <select>
            <option value="Estilo">
              <i className="bi bi-palette"></i> Estilo
            </option>
            {estilos.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Ubicacion">
              <i className="bi bi-geo-alt"></i> Ubicación
            </option>
            {ubicaciones.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Tamano">
              <i className="bi bi-arrows-expand"></i> Tamaño
            </option>
            {tamanos.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Color">
              <i className="bi bi-paint-bucket"></i> Color
            </option>
            {colores.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <select>
            <option value="Tematica">
              <i className="bi bi-file-earmark-text"></i> Temática
            </option>
            {tematicas.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <select id="artista">
            <option value="">Seleccionar artista</option>
            {loading ? (
              <option value="">Cargando...</option>
            ) : (
              artistas.map((artista) => (
                <option key={artista.idArtista} value={artista.idArtista}>
                  {artista.nombre}
                </option>
              ))
            )}
          </select>
        </div>
      </section>

      {/* Galería de imágenes */}
      <section className="galeria">
        {imagenes.length > 0 ? (
          imagenes.map((imagen, index) => (
            <div key={index} className="imagen" onClick={() => handleImageClick(imagen.imagenTatuaje)}>
              <img src={imagen.imagenTatuaje} alt={`Imagen ${index}`} />
            </div>
          ))
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </section>

      {/* Imagen expandida */}
      {imagenExpandida && (
        <div id="imagenExpandida" className="imagen-expandida">
          <div className="controls">
            <span id="cerrar" className="cerrar" onClick={handleClose}>
              <FaTimesCircle /> {/* Icono de Cerrar */}
            </span>
          </div>
          <img
            id="imgExpandida"
            src={imagenExpandida}
            alt="Imagen expandida"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {loading && <p>Cargando...</p>}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default GaleriaCliente;
