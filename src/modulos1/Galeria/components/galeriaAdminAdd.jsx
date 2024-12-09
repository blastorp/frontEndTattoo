import React, { useState, useEffect } from "react";
import '../estilos/galeriaadd.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import { storage } from "../../../services/firebase/FirebaseConTOI";
import Select from 'react-select';

const GaleriaADMINAdd = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [artistas, setArtistas] = useState([]);
    const [estilos, setEstilos] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [tamanos, setTamanos] = useState([]);
    const [colores, setColores] = useState([]);
    const [tematicas, setTematicas] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState(
        Array.from({ length: 5 }, () => []) // Inicializa con 5 arrays vacíos para las selecciones múltiples
    );

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
        fetchSubCategorias();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoriaChange = (selectedOptions, index) => {
        const nuevasCategorias = [...categorias];
        nuevasCategorias[index] = selectedOptions.map(option => option.value); // Mapea los valores seleccionados a los IDs
        setCategorias(nuevasCategorias);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        const nombreTatuaje = e.target.elements.input1.value;
        const artistaSeleccionado = e.target.elements.artista.value;
        const publicar = e.target.elements.publicar.checked;

        // Combina todos los IDs seleccionados en una sola cadena separada por comas
        const subcategoriaIds = categorias.flat().join(",");

        if (!subcategoriaIds) {
            setMensaje("Debes seleccionar al menos una categoría.");
            setLoading(false);
            return;
        }

        formData.append("nombreTatuaje", nombreTatuaje);
        formData.append("artistaSeleccionado", artistaSeleccionado);
        formData.append("publicar", publicar);
        formData.append("subcategoriaIds", subcategoriaIds);
        
        if (imagePreview) {
            // Configura Firebase y crea una referencia de almacenamiento
            const storageRef = storage().ref(); // Asegúrate de que storage() sea almacenado correctamente
            const file = dataURLtoFile(imagePreview, 'image.jpg'); // Convierte la URL de la vista previa a un archivo
            const uploadTask = storageRef.child(`gallery/${file.name}`).put(file); // Cambiado a 'gallery'

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error("Error al subir la imagen:", error);
                    setMensaje("Error al subir la imagen.");
                    setLoading(false);
                },
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    formData.append("imagentatuaje", downloadURL); // Agrega la URL de descarga de la imagen a los datos del formulario

                    try {
                        const response = await fetchApiM2(ENDPOINTS.CREATE_GALERIA, "POST", formData);
                        if (response.success) {
                            setMensaje("Tatuaje añadido con éxito.");
                        } else {
                            setMensaje(`Error al añadir tatuaje: ${response.message || 'Desconocido'}`);
                        }
                    } catch (error) {
                        console.error("Error al añadir tatuaje:", error);
                        setMensaje("Error al añadir tatuaje");
                    } finally {
                        setLoading(false);
                    }
                }
            );
        } else {
            try {
                const response = await fetchApiM2(ENDPOINTS.CREATE_GALERIA, "POST", formData);
                if (response.success) {
                    setMensaje("Tatuaje añadido con éxito.");
                } else {
                    setMensaje(`Error al añadir tatuaje: ${response.message || 'Desconocido'}`);
                }
            } catch (error) {
                console.error("Error al añadir tatuaje:", error);
                setMensaje("Error al añadir tatuaje");
            } finally {
                setLoading(false);
            }
        }
    };

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    return (
        <div className="container">
            <h1 className="form-title">Añadir imagen</h1>
            <div className="form-layout">
                <div className="image-container">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                        <div className="placeholder">Vista Previa</div>
                    )}
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="input1">Nombre del tatuaje</label>
                            <input type="text" id="input1" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="artista">Nombre artista</label>
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
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" name="publicar" />
                            Publicar
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={() => document.getElementById("fileInput").click()}>
                            Subir imagen
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </div>
                    <div className="form-group">
                        <label>Estilos</label>
                        <Select
                            isMulti
                            options={estilos}
                            onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 0)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ubicación</label>
                        <Select
                            isMulti
                            options={ubicaciones}
                            onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 1)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tamaño</label>
                        <Select
                            isMulti
                            options={tamanos}
                            onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 2)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Color</label>
                        <Select
                            isMulti
                            options={colores}
                            onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 3)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Temática</label>
                        <Select
                            isMulti
                            options={tematicas}
                            onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 4)}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Añadiendo..." : "Añadir"}
                    </button>
                </form>
                {mensaje && <div className="mensaje">{mensaje}</div>}
            </div>
        </div>
    );
};

export default GaleriaADMINAdd;
