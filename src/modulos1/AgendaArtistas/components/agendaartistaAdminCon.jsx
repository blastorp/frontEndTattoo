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
                const response = await fetchApiM2(ENDPOINTS.GETARTISTAAVAILABILITY); // Endpoint de la API
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

    // Filtrado de los datos
    const filteredData = data.filter(
        (row) =>
            row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.estiloTatuaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.fecha.includes(searchTerm)
    );

    // Navegar a la edición del artista
    const handleEdit = (id) => {
        navigate(`/pages/agendaartistaedit/${id}`); 
    };

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Lista de agenda de artistas</h1>
            <div className="search-container">
                <label htmlFor="search-input" className="search-label">Buscar:</label>
                <input
                    type="text"
                    id="search-input"
                    className="search-input"
                    placeholder="Buscar por cliente, estilo o fecha"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                />
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre artista</th>
                        <th>Día</th>
                        <th>Horario</th>
                        <th>Horario miembro</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.nombre}</td>
                                <td>{row.dia}</td>
                                <td>{row.horario}</td>
                                <td>{row.horarioMiembro}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(row.id)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


export default AgendaArtistaADMINCon;
