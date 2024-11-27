import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../estilos/agendaartistascon.css';
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";

const MembresiaADMINVenta = () => {
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre artista</th>
                        <th>Dia</th>
                        <th>Horario</th>
                        <th>Horario miembro</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.Nombre}</td>
                            <td>{row.Dia}</td>
                            <td>{row.Horario}</td>
                            <td>{row.HorarioMiembro}</td>
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


export default MembresiaADMINVenta;
