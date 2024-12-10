import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import '../estilos/membresiacon.css';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const MembresiaADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from:", ENDPOINTS.GET_ALL_MEMBRESIAS);
                const response = await fetchApiM2(ENDPOINTS.GET_ALL_MEMBRESIAS);
                setData(response || []);
            } catch (error) {
                console.error("Error al hacer el fetch:", error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = async (idMembresia, Campo, Valor) => {
        if (!idMembresia) {
            console.error("idMembresia no está definido");
            return;
        }
    
        // Reemplazar {idMembresia} en la URL con el valor real
        const url = ENDPOINTS.UPDATE_PUBLICAR_MEMBRESIA.replace("{idMembresia}", idMembresia);
        console.log("URL generada para el PATCH:", url);
    
        try {
            // Construir el objeto que se enviará al backend
            const requestData = {
                idMembresia: idMembresia,  // Asegúrate de que el ID se esté enviando
                Campo: Campo,         // El campo que debe actualizarse (Disponible o EsMembresia)
                Valor: Valor,         // El valor (true o false) que se debe asignar
            };
    
            console.log("Datos enviados al backend:", requestData);
    
            // Realizar la solicitud PATCH utilizando fetchApiM2
            const response = await fetchApiM2(url, "PATCH", requestData);
    
            // Verificar si la respuesta fue exitosa
            console.log("Respuesta exitosa:", response);
            setData((prevData) =>
                prevData.map((row) =>
                    row.idMembresia === idMembresia
                        ? { ...row, [Campo]: Valor }
                        : row
                )
            );
        } catch (error) {
            console.error("Error al hacer el fetch:", error);
        }
    };

    
    const filteredData = data.filter((row) =>
        row.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.beneficios?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-wrapper">
            <h1 className="table-title">Lista de membresías</h1>
            <div className="search-container">
                <label htmlFor="search-input" className="search-label">Buscar:</label>
                <input
                    type="text"
                    id="search-input"
                    className="search-input"
                    placeholder="Buscar por nivel, beneficios o fecha"
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
                        <th>Fecha creación</th>
                        <th>Fecha vencimiento</th>
                        <th>Duración</th>
                        <th>Publicar</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.idMembresia}>
                                <td>{row.idMembresia}</td>
                                <td>{row.nivel}</td>
                                <td>{row.beneficios || "No disponible"}</td>
                                <td>{row.precioMensual}</td>
                                <td>{new Date(row.fechaCreacion).toLocaleDateString()}</td>
                                <td>{new Date(row.fechaVencimiento).toLocaleDateString()}</td>
                                <td>{row.duracion} meses</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.publicar}
                                        onChange={(e) => handleCheckboxChange(row.idMembresia, "publicar",e.target.checked)}
                                    />
                                </td> 
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => navigate(`/pages/membresiaedit/${row.idMembresia}`)}
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

export default MembresiaADMINCon;
