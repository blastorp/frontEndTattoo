import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../estilos/galeriacon.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const GaleriaADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]); // Estado para almacenar los datos
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GET_ALL_GALERIA);
                console.log("Respuesta de la API:", response); // Diagnóstico de la respuesta

                if (Array.isArray(response)) {
                    setData(response);
                } else if (response?.data && Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error("No se encontraron datos en la respuesta.");
                }
            } catch (error) {
                console.error("Error al hacer el fetch:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("Datos cargados en el estado:", data);
    }, [data]);

    if (data.length === 0) {
        return <div>Cargando...</div>;
    }

    const handleCheckboxChange = async (idTatuaje, Campo, Valor) => {
        if (!idTatuaje) {
            console.error("IdTatuaje no está definido");
            return;
        }

        const url = ENDPOINTS.UPDATE_GALERIA_PUBLICAR.replace("{idTatuaje}", idTatuaje);
        console.log("URL generada para el PATCH:", url);

        try {
            const requestData = {
                idTatuaje: idTatuaje,  
                Campo: Campo,         
                Valor: Valor,         
            };

            console.log("Datos enviados al backend:", requestData);

            const response = await fetchApiM2(url, "PATCH", requestData);

            console.log("Respuesta exitosa:", response);
            setData((prevData) =>
                prevData.map((row) =>
                    row.idTatuaje === idTatuaje
                        ? { ...row, [Campo]: Valor }
                        : row
                )
            );
        } catch (error) {
            console.error("Error al hacer el fetch:", error);
        }
    };

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Lista de galería de tatuajes</h1>
            <div className="search-container">
                <label htmlFor="search-input" className="search-label">Buscar:</label>
                <input
                    type="text"
                    id="search-input"
                    className="search-input"
                    placeholder="Buscar por cliente, estilo o fecha"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Fecha</th>
                        <th>Artista</th>
                        <th>Publicar</th>
                        <th>Subcategorías</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .filter((row) => {
                            const nombreTatuaje = row.nombreTatuaje || "";
                            const fecha = new Date(row.fechapublicacion).toLocaleDateString() || "";
                            return (
                                nombreTatuaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                fecha.includes(searchTerm)
                            );
                        })
                        .map((row) => (
                            <tr key={row.idTatuaje}>
                                <td>{row.idTatuaje}</td>
                                <td>{row.nombreTatuaje}</td>
                                <td>
                                    <img
                                        src={row.imagenTatuaje || "placeholder.jpg"}
                                        alt={row.nombreTatuaje}
                                        className="gallery-image"
                                    />
                                </td>
                                <td>{new Date(row.fechaPublicacion).toLocaleDateString()}</td>
                                <td>{row.idArtista}</td>
                                <td>
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            className="styled-checkbox"
                                            checked={row.publicar}
                                            onChange={(e) => handleCheckboxChange(row.idTatuaje, "publicar", e.target.checked)}
                                        />
                                    </div>
                                </td>
                                <td>{row.subcategorias}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => navigate(`/pages/galeriaedit/${row.idTatuaje}`)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default GaleriaADMINCon;
