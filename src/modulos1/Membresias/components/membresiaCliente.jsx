import React, { useState, useEffect } from "react";
import "../estilos/membresia.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const Membresia = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API
  const [currentIndex, setCurrentIndex] = useState(0); // Índice para el carrusel
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const cardsToShow = 3; // Número de tarjetas visibles a la vez
  const cardWidth = 350; // Ancho de cada tarjeta
  const maxIndex = data.length - cardsToShow; // Último índice permitido

  useEffect(() => {
    // Hacer la solicitud para obtener las membresías
    const fetchData = async () => {
      try {
        setLoading(true); // Establecer el estado de carga en true al iniciar la solicitud
        const response = await fetchApiM2(ENDPOINTS.GET_ALL_MEMBRESIAS);
        if (Array.isArray(response)) {
          setData(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          throw new Error("No se encontraron datos válidos");
        }
      } catch (error) {
        setError(error.message); // Guardar el mensaje de error en el estado
      } finally {
        setLoading(false); // Establecer el estado de carga en false cuando la solicitud ha terminado
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Mostrar mensaje mientras los datos se están cargando
  if (loading) {
    return <div>Cargando membresías...</div>;
  }

  // Mostrar mensaje de error si se produjo uno
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Membresías</h1>
      <div className="membership-carousel-wrapper">
        <button className="carousel-nav prev-btn" onClick={prevSlide} disabled={currentIndex === 0}>
          &#10094;
        </button>
        <div className="membership-carousel">
          <div className="membership-cards">
            {data.map((membresia) => (
              <div className="card" key={membresia.idMembresia}>
                <h3 className="membership-name">{membresia.nivel}</h3>
                <p className="membership-price">₡{membresia.precioMensual}/mes</p>
                <ul className="membership-benefits">
                  {membresia.beneficios ? (
                    membresia.beneficios.split(";").map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))
                  ) : (
                    <li>No hay beneficios disponibles</li>
                  )}
                </ul>
                <button className="choose-button">Elegir</button>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-nav next-btn" onClick={nextSlide} disabled={currentIndex === maxIndex}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Membresia;
