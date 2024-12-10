import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../estilos/palabrasvetadasaddedit.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const PalabrasVetadasADMINEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        palabra: "",
    });

    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            console.log("Cargando datos...");
            try {
                const palabraResponse = await fetchApiM2(
                    ENDPOINTS.GET_PALABRAS_VETADAS_POR_ID.replace("{id}", id)
                );

                if (palabraResponse) {
                    setFormData({
                        palabra: palabraResponse.palabra || "",
                    });
                    console.log("Datos cargados:", palabraResponse);
                } else {
                    setMensaje("Palabra vetada no encontrada.");
                    console.log("Palabra vetada no encontrada");
                }
            } catch (error) {
                setMensaje("Error al cargar los datos.");
                console.log("Error al cargar los datos:", error);
            } finally {
                setLoading(false);
                console.log("Carga de datos completada");
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Componente React
    const handleSubmit = async (event) => {
        event.preventDefault();
        const palabra = {
            id: id, // id debe ser un string, no un número
            palabra: formData.palabra
        };

        try {
            console.log("Enviando datos al backend...");
            console.log("Datos enviados:", palabra);
            const response = await fetch(
                ENDPOINTS.UPDATE_PALABRAS_VETADAS.replace("{id}", palabra.id), {
                    method: 'PATCH', // Cambiado de 'PUT' a 'PATCH'
                    body: JSON.stringify(palabra),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.ok) {
                console.log("Actualización de datos completada");
                navigate('/pages/palabrasvetadasedit'); // Asegúrate de manejar la navegación correctamente
            } else {
                const errorData = await response.json();
                console.error("Error al enviar al backend:", errorData);
                setMensaje("Error al enviar al backend");
            }
        } catch (error) {
            console.error("Error al enviar al backend:", error);
            setMensaje("Error al enviar al backend");
        }
    };


    return (
        <div className="form-container">
            <h1 className="form-title">Editar Palabra Vetada</h1>
            <div className="form-content">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="palabra" className="form-label">Palabra</label>
                            <input
                                type="text"
                                id="palabra"
                                name="palabra"
                                className="input"
                                value={formData.palabra}
                                onChange={handleChange}
                                placeholder="Escribe la palabra"
                            />
                        </div>

                        {mensaje && <p className="mensaje">{mensaje}</p>}

                        <button type="submit" className="button" disabled={loading}>
                            {loading ? "Actualizando..." : "Actualizar"}
                        </button>
                    </form>
                )}

                <div className="image-container">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FTattoo5.jpeg?alt=media&token=2a7f670d-6a7a-4038-b35a-971ec3df1ce3"
                        alt="Imagen"
                        className="form-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default PalabrasVetadasADMINEdit;
