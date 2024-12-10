import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../services/firebase/firebaseConn2"; 
import '../estilos/galeriaadd.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
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
        Array.from({ length: 5 }, () => []) 
    );
    const [downloadURL, setDownloadURL] = useState(null);

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

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result); // Actualiza la vista previa de la imagen
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCategoriaChange = (selectedOptions, index) => {
        const nuevasCategorias = [...categorias];
        nuevasCategorias[index] = selectedOptions.map(option => option.value); // Mapea los valores seleccionados a los IDs
        setCategorias(nuevasCategorias);
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

        const nombreTatuaje = e.target.nombreTatuaje.value;
        const artistaSeleccionado = e.target.artista.value;
        const publicar = e.target.publicar.checked;
        const estilosSeleccionados = categorias[0];
        const ubicacionesSeleccionadas = categorias[1];
        const tamanosSeleccionados = categorias[2];
        const coloresSeleccionados = categorias[3];
        const tematicasSeleccionadas = categorias[4];
    
        if (!downloadURL) {
            setMensaje("Debes subir una imagen.");
            setLoading(false);
            return;
        }
    
        const requestBody = {
            idTatuaje: 0,  // Ajusta este valor según tu lógica de creación
            nombreTatuaje,
            imagenTatuaje: downloadURL,  // Utiliza la URL de la imagen subida
            fechaPublicacion: new Date().toISOString(),
            idArtista: artistaSeleccionado,
            publicar,
            subcategoriaIds: [
                ...estilosSeleccionados,
                ...ubicacionesSeleccionadas,
                ...tamanosSeleccionados,
                ...coloresSeleccionados,
                ...tematicasSeleccionadas
            ]
        };

        try {
            const response = await fetchApiM2(
                ENDPOINTS.CREATE_GALERIA,
                "POST",
                requestBody
            );
            console.log("Respuesta del servidor:", response);
            setMensaje("Elemento añadido exitosamente.");
        } catch (error) {
            console.error("Error al añadir elemento:", error);
            setMensaje("Error al añadir elemento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="form-title">Añadir imagen</h1>
            <div className="form-layout">
                <div className="image-container">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Vista previa" className="image-preview" />
                    ) : (
                        <div className="placeholder">Vista Previa</div>
                    )}
                </div>
                <form className="form-container" onSubmit={handleSubmitForm}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombreTatuaje">Nombre del tatuaje</label>
                            <input type="text" id="nombreTatuaje" required />
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
                    <div className="form-group button-group">
                        <input type="file" id="imageTatuaje" accept="image/*" onChange={handleImageUpload} />
                        <button type="button" onClick={handleSubmitImage}>Enviar imagen</button>
                    </div>
                    <div className="form-row select-group">
                        <div className="select-container">
                            <label>Estilos</label>
                            <Select
                                isMulti
                                options={estilos}
                                onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 0)}
                            />
                        </div>
                        <div className="select-container">
                            <label>Ubicación</label>
                            <Select
                                isMulti
                                options={ubicaciones}
                                onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 1)}
                            />
                        </div>
                        <div className="select-container">
                            <label>Tamaño</label>
                            <Select
                                isMulti
                                options={tamanos}
                                onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 2)}
                            />
                        </div>
                        <div className="select-container">
                            <label>Color</label>
                            <Select
                                isMulti
                                options={colores}
                                onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 3)}
                            />
                        </div>
                        <div className="select-container">
                            <label>Temática</label>
                            <Select
                                isMulti
                                options={tematicas}
                                onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 4)}
                            />
                        </div>
                    </div>
                    <p>{mensaje}</p>
                    <button type="submit">Añadir</button>
                </form>
            </div>
        </div>
    );
};

export default GaleriaADMINAdd;
