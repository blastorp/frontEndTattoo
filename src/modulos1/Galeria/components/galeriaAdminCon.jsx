import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import '../estilos/galeriacon.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const GaleriaADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]); // Estado para almacenar los datos
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        // Hacer la solicitud para obtener los datos
        const fetchData = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GETGALERIAPUBLICADOS); 
                console.log("Respuesta de la API:", response);

                // Manejo de la respuesta
                if (Array.isArray(response)) {
                    setData(response);
                } else if (response && response.data && Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error("No se encontraron datos válidos en la respuesta.", response);
                }
            } catch (error) {
                console.error("Error al hacer el fetch:", error);
            }
        };

        fetchData(); // Llamar a la función de fetch al montar el componente
    }, []);

    // Filtrar datos según el término de búsqueda
    const filteredData = data.filter(
        (row) =>
            row.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.estilo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.fecha?.includes(searchTerm)
    );

    // Navegar al formulario de edición
    const handleEdit = (id) => {
        navigate(`/pages/galeriaedit/${id}`);
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
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.nombre}</td>
                                <td>
                                    <img
                                        src={row.imagen || "placeholder.jpg"}
                                        alt={row.nombre}
                                        className="gallery-image"
                                    />
                                </td>
                                <td>{new Date(row.fecha).toLocaleDateString()}</td>
                                <td>{row.artista}</td>
                                <td>{row.publicar ? "Sí" : "No"}</td>
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
                            <td colSpan="7" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GaleriaADMINCon;
