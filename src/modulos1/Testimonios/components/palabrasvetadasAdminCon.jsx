import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../estilos/palabrasvetadascon.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import { FaRedo } from 'react-icons/fa'; 

const PalabrasVetadasADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]); // Estado para almacenar los datos
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GET_ALL_PALABRAS_VETADAS);
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

    const handleDeleteButtonClick = async (id) => {
        try {
            console.log("Eliminando testimonios con ID:", id);
            await fetchApiM2(ENDPOINTS.DELETE_PALABRAS_VETADAS.replace("{id}", id), "DELETE", {});

            // Filtra los testimonios restantes
            setData((prevData) => prevData.filter((row) => row.id !== id));
            console.log("Testimonio eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar testimonio:", error);
        }
    };

    const handleRefreshButtonClick = () => {
        window.location.reload(); 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleDateString('en-GB');
    };

    const filteredData = data.filter((row) => {
        if (!row.palabra) return false;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const matchId = String(row.id).toLowerCase().includes(lowerCaseSearchTerm);
        const matchTestimonio = row.palabra.toLowerCase().includes(lowerCaseSearchTerm);

        return matchId || matchTestimonio;
    });

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Lista de palabras vetadas</h1>
            <div className="search-container">
                <label htmlFor="search-input" className="search-label">Buscar:</label>
                <input
                    type="text"
                    id="search-input"
                    className="search-input"
                    placeholder="Buscar por testimonio o fecha"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button id="refresh-button" className="refresh-button update-button" onClick={handleRefreshButtonClick}>
                    <FaRedo /> 
                </button>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Palabra</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.palabra}</td>
                                <td>{formatDate(row.fecha)}</td>
                                <td>
                                <button
                                        className="edit-button"
                                        onClick={() => navigate(`/pages/palabrasvetadasedit/${row.id}`)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteButtonClick(row.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PalabrasVetadasADMINCon;
