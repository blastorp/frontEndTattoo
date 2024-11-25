import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../estilos/membresiacon.css';

const MembresiaADMINCon = () => {
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
        navigate(`/pages/membresiaedit/${id}`); // Redirige a la página con el ID del elemento
    };

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Lista de membresías</h1>
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
                        <th>Nivel</th>
                        <th>Beneficios</th>
                        <th>Precio mensual</th>
                        <th>Fecha creacion</th>
                        <th>Duracion</th>
                        <th>Publicar</th>
                        <th>Acción</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.Nivel}</td>
                            <td>{row.Beneficios}</td>
                            <td>{row.Preciomensual}</td>
                            <td>{row.FechaCreacion}</td>
                            <td>{row.Duracion}</td>
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
                            <td colSpan="5" className="no-data">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MembresiaADMINCon;
