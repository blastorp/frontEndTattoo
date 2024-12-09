import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../estilos/galeriaedit.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import Select from 'react-select';

const GaleriaADMINEdit = () => {
    const { id } = useParams(); 
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

    useEffect(() => {
        const fetchArtistas = async () => {
            setLoading(true);
            try {
                const artistasResponse = await fetchApiM2(ENDPOINTS.GET_ARTISTA_POR_IDNOMBRE);
                console.log(artistasResponse); // Verificar los datos recibidos

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
                    setEstilos(estilosResponse.map(item => ({ value: item.nombre, label: item.nombre })));
                    setUbicaciones(ubicacionesResponse.map(item => ({ value: item.nombre, label: item.nombre })));
                    setTamanos(tamanosResponse.map(item => ({ value: item.nombre, label: item.nombre })));
                    setColores(coloresResponse.map(item => ({ value: item.nombre, label: item.nombre })));
                    setTematicas(tematicasResponse.map(item => ({ value: item.nombre, label: item.nombre })));
                } else {
                    setMensaje("No se pudieron cargar las subcategorías.");
                }
            } catch (error) {
                setMensaje("Error al cargar los datos.");
            } finally {
                setLoading(false);
            }
        }

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
        nuevasCategorias[index] = selectedOptions.map(option => option.value);
        setCategorias(nuevasCategorias);
    };

    return (
        <div className="container">
            <h1 className="form-title">Editar imagen: {id}</h1>
            <div className="form-layout">
                <div className="image-container">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                        <div className="placeholder">Vista Previa</div>
                    )}
                </div>
                <form className="form-container">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="input1">Nombre del tatuaje</label>
                            <input type="text" id="input1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="artista">Nombre artista</label>
                            <select id="artista">
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
                            <input type="checkbox" />
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
                        <label>Categorías</label>
                        <div className="select-group">
                            <div className="select-container">
                                <Select
                                    isMulti
                                    options={estilos}
                                    value={categorias[0].map(value => ({ value, label: value }))}
                                    onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 0)}
                                    placeholder="Seleccionar estilo"
                                />
                            </div>
                            <div className="select-container">
                                <Select
                                    isMulti
                                    options={ubicaciones}
                                    value={categorias[1].map(value => ({ value, label: value }))}
                                    onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 1)}
                                    placeholder="Seleccionar ubicación"
                                />
                            </div>
                            <div className="select-container">
                                <Select
                                    isMulti
                                    options={tamanos}
                                    value={categorias[2].map(value => ({ value, label: value }))}
                                    onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 2)}
                                    placeholder="Seleccionar tamaño"
                                />
                            </div>
                            <div className="select-container">
                                <Select
                                    isMulti
                                    options={colores}
                                    value={categorias[3].map(value => ({ value, label: value }))}
                                    onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 3)}
                                    placeholder="Seleccionar color"
                                />
                            </div>
                            <div className="select-container">
                                <Select
                                    isMulti
                                    options={tematicas}
                                    value={categorias[4].map(value => ({ value, label: value }))}
                                    onChange={(selectedOptions) => handleCategoriaChange(selectedOptions, 4)}
                                    placeholder="Seleccionar temática"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GaleriaADMINEdit;
