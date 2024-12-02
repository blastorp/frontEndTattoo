import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import '../estilos/agendaartistascon.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const AgendaArtistaADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]); // Estado para almacenar los datos
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        // Hacer la solicitud para obtener los datos
        const fetchData = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GETALLAGENDAARTISTAS); // Endpoint de la API
                console.log("Respuesta de la API:", response); // Diagnóstico de la respuesta

                // Verifica si los datos están presentes en la respuesta
                if (Array.isArray(response)) {
                    console.log("Datos obtenidos directamente como array:", response);
                    setData(response); // Establecer los datos obtenidos en el estado
                } else if (response && response.data && Array.isArray(response.data)) {
                    console.log("Datos obtenidos dentro de 'data':", response.data);
                    setData(response.data); // Establecer los datos si están dentro de "data"
                } else {
                    console.error("No se encontraron datos en la respuesta. Respuesta:", response);
                }
            } catch (error) {
                console.error("Error al hacer el fetch:", error);
            }
        };

        fetchData(); // Llamar a la función de fetch al montar el componente
    }, []); // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monta

    // Diagnóstico: Verifica los datos cargados en el estado
    useEffect(() => {
        console.log("Datos cargados en el estado:", data);
    }, [data]);

    // Si los datos aún no están disponibles, muestra un mensaje de carga
    if (data.length === 0) {
        return <div>Cargando...</div>; // Puedes mostrar un mensaje de "Cargando..." mientras los datos están vacíos
    }

    // Comprobación: Verifica si los datos tienen las propiedades correctas
    console.log("Datos para renderizar:", data);

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Agenda de Artistas</h1>
            <div className="search-container">
                <label htmlFor="search-input" className="search-label">Buscar:</label>
                <input
                    type="text"
                    id="search-input"
                    className="search-input"
                    placeholder="Buscar por nombre de artista, fecha, hora"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                />
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Artista</th>
                        <th>Fecha</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Miembro</th>
                        <th>Publicar</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data
                            .filter((row) => {
                                // Filtrar los datos según el término de búsqueda
                                const nombreArtista = row.nombreArtista || "";
                                const fecha = row.fecha || "";
                                return (
                                    nombreArtista.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    fecha.toLowerCase().includes(searchTerm.toLowerCase())
                                );
                            })
                            .map((row) => (
                                <tr key={row.idAgenda}>
                                    <td>{row.idAgenda}</td>
                                    <td>{row.nombreArtista}</td>
                                    <td>{new Date(row.fecha).toLocaleDateString()}</td>
                                    <td>{row.horaInicio}</td>
                                    <td>{row.horaFin}</td>
                                    <td>{row.esMembresia ? "Sí" : "No"}</td>
                                    <td>{row.disponible ? "Sí" : "No"}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => navigate(`/pages/agendaartistaedit/${row.idAgendaArtista}`)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AgendaArtistaADMINCon;
