import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir a otra página
import '../estilos/galeriacon.css';

const GaleriaADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Hook para navegación

    const data = [
        { id: 1, name: "John Doe", tattooStyle: "Realismo", date: "2024-12-01" },

    ];

    const filteredData = data.filter(
        (row) =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.tattooStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.date.includes(searchTerm)
    );

    const handleEdit = (id) => {
        navigate(`/pages/galeriaedit/${id}`); // Redirige a la página con el ID del elemento
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
                    {filteredData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.Nombre}</td>
                            <td>{row.Imagen}</td>
                            <td>{row.Fecha}</td>
                            <td>{row.Artista}</td>
                            <td>{row.Publicar}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(row.id)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredData.length === 0 && (
                        <tr>
                            <td colSpan="8" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GaleriaADMINCon;
