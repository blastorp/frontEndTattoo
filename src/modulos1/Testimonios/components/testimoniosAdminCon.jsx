import React, { useState, useEffect } from "react";
import '../estilos/testimoniocon.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import { FaRedo } from 'react-icons/fa'; 

const TestimoniosADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from:", ENDPOINTS.GET_ALL_TESTIMONIOS);
                const response = await fetchApiM2(ENDPOINTS.GET_ALL_TESTIMONIOS);
                setData(response || []);
                console.log("Data fetched successfully:", response);
            } catch (error) {
                console.error("Error al hacer el fetch:", error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = async (idTestimonio, campo, valor) => {
        if (!idTestimonio) {
            console.error("IdTestimonio no está definido");
            return;
        }

        const url = ENDPOINTS.UPDATE_PUBLICAR_TESTIMONIOS.replace("{idTestimonio}", idTestimonio);
        console.log("URL generada para el PATCH:", url);

        try {
            const requestData = {
                idTestimonio: idTestimonio,
                campo: campo,
                valor: valor,
            };

            console.log("Datos enviados al backend:", requestData);

            const response = await fetchApiM2(url, "PATCH", requestData);
            console.log("Respuesta exitosa:", response);

            setData((prevData) =>
                prevData.map((row) =>
                    row.idTestimonio === idTestimonio
                        ? { ...row, [campo]: valor }
                        : row
                )
            );
        } catch (error) {
            console.error("Error al hacer el fetch:", error);
        }
    };

    const handleDeleteButtonClick = async (idTestimonio) => {
        try {
            console.log("Eliminando testimonios con ID:", idTestimonio);
            await fetchApiM2(ENDPOINTS.DELETE_TESTIMONIOS.replace("{idTestimonio}", idTestimonio), "DELETE", {});

            setData((prevData) => prevData.filter((row) => row.idTestimonio !== idTestimonio));
            console.log("Testimonio eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar testimonio:", error);
        }
    };

    const handleDeleteAllButtonClick = async () => {
        try {
            console.log("Eliminando testimonios con palabras vetadas...");
            await fetchApiM2(ENDPOINTS.DELETE_PVETADA_TESTIMONIOS, "DELETE", {});

            
            setData((prevData) => prevData.filter((row) => !row.noVetas)); 
        } catch (error) {
            console.error("Error al eliminar testimonios:", error);
        }
    };

    const handleRefreshButtonClick = () => {
        window.location.reload(); 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
    };

    const renderStars = (rating) => {
        return (
            <div className="stars-container">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < rating ? "filled" : ""}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const filteredData = data.filter((row) => {
        if (!row.testimonioTexto) return false;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const matchId = String(row.idTestimonio).toLowerCase().includes(lowerCaseSearchTerm);
        const matchTestimonio = row.testimonioTexto.toLowerCase().includes(lowerCaseSearchTerm);

        return matchId || matchTestimonio;
    });

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Lista de testimonios</h1>
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
            <div className="delete-container">
                <label htmlFor="delete-button" className="delete-label">Testimonios con palabras vetadas</label>
                <button id="delete-button" className="delete-button update-button" onClick={handleDeleteAllButtonClick}>
                    Eliminar
                </button>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Testimonio</th>
                        <th>Fecha</th>
                        <th>Calificación</th>
                        <th>Publicar</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.idTestimonio}>
                                <td>{row.idTestimonio}</td>
                                <td>{row.nombre}</td>
                                <td>{row.testimonioTexto}</td>
                                <td>{formatDate(row.fechaPublicacion)}</td>
                                <td>{renderStars(row.calificacion)}</td>
                                <td>
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            className="styled-checkbox"
                                            checked={row.publicar}
                                            onChange={(e) => handleCheckboxChange(row.idTestimonio, "publicar", e.target.checked)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteButtonClick(row.idTestimonio)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TestimoniosADMINCon;
