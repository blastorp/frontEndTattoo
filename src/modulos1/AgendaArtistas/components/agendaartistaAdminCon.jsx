import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../estilos/agendaartistascon.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const AgendaArtistaADMINCon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]); // Estado para almacenar los datos
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GET_ALL_AGENDAARTISTAS);
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

    const handleCheckboxChange = async (idAgenda, Campo, Valor) => {
      if (!idAgenda) {
          console.error("IdAgenda no está definido");
          return;
      }
  
      const url = ENDPOINTS.UPDATE_DMP_AGENDA_ARTISTA.replace("{idAgenda}", idAgenda);
      console.log("URL generada para el PATCH:", url);
  
      try {
          const requestData = {
              idAgenda: idAgenda,  
              Campo: Campo,         
              Valor: Valor,         
          };
  
          console.log("Datos enviados al backend:", requestData);
  
          const response = await fetchApiM2(url, "PATCH", requestData);
  
          console.log("Respuesta exitosa:", response);
          setData((prevData) =>
              prevData.map((row) =>
                  row.idAgenda === idAgenda
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
            <h1 className="table-title">Agenda de Artistas</h1>
            <div className="search-container">
                <label htmlFor="search-input" className="search-label">Buscar:</label>
                <input
                    type="text"
                    id="search-input"
                    className="search-input"
                    placeholder="Buscar por nombre de artista o fecha"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                        <th>Disponible</th>
                        <th>Publicar</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .filter((row) => {
                            const IdArtista = row.IdArtista || "";
                            const fecha = new Date(row.fecha).toLocaleDateString() || "";
                            return (
                              IdArtista.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                fecha.includes(searchTerm)
                            );
                        })
                        .map((row) => (
                            <tr key={row.idAgenda}>
                                <td>{row.idAgenda}</td>
                                <td>{row.idArtista}</td>
                                <td>{new Date(row.fecha).toLocaleDateString()}</td>
                                <td>{row.horaInicio.substring(0, 5)}</td>
                                <td>{row.horaFin.substring(0, 5)}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.esMembresia}
                                        onChange={(e) => handleCheckboxChange(row.idAgenda, "esMembresia", e.target.checked)} // 'Campo' y 'Valor' utilizados correctamente
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.disponible}
                                        onChange={(e) => handleCheckboxChange(row.idAgenda, "disponible", e.target.checked)} // 'Campo' y 'Valor' utilizados correctamente
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.publicar}
                                        onChange={(e) => handleCheckboxChange(row.idAgenda, "publicar", e.target.checked)} // 'Campo' y 'Valor' utilizados correctamente
                                    />
                                </td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => navigate(`/pages/agendaartistasedit/${row.idAgenda}`)}
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

export default AgendaArtistaADMINCon;
