import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/inicioC.css";
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";

const Inicio = () => {
    const [testimonios, setTestimonios] = useState([]);
    const [galeria, setGaleria] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Función para obtener testimonios desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GET_ULTIMOS_TESTIMONIOS);
                console.log("Respuesta de la API:", response);

                if (Array.isArray(response)) {
                    setTestimonios(response);
                } else if (response?.data && Array.isArray(response.data)) {
                    setTestimonios(response.data);
                } else {
                    console.error("No se encontraron datos válidos en la respuesta.");
                }
            } catch (error) {
                console.error("Error al obtener los testimonios:", error);
            }
        };

        fetchData();
    }, []);

    // Obtener galería de inicio desde la API
    useEffect(() => {
        const fetchGaleria = async () => {
            try {
                const response = await fetchApiM2(ENDPOINTS.GET_GALERIA_INICIO);
                console.log("Respuesta de la API:", response);

                if (Array.isArray(response)) {
                    setGaleria(response);
                } else if (response?.data && Array.isArray(response.data)) {
                    setGaleria(response.data);
                } else {
                    console.error("No se encontraron datos válidos en la respuesta.");
                }
            } catch (error) {
                console.error("Error al obtener la galería:", error);
            }
        };

        fetchGaleria();
    }, []);

    // Control deslizante automático
    useEffect(() => {
        if (testimonios.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [testimonios]);

    // Función para mover diapositivas manualmente
    const moveSlide = (direction) => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + direction + testimonios.length) % testimonios.length;
            return newIndex;
        });
    };

    // Renderizador de estrellas según calificación
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
                ★
            </span>
        ));
    };

    return (
        <div>
            {/* Sección de Membresía */}
            <div className="membership-container">
                <div className="membership-content">
                    <h2>Ink Society</h2>
                    <p>
                        Con tu membresía, disfrutarás de descuentos exclusivos en todos nuestros
                        servicios, ofertas especiales solo para miembros, y acceso a promociones
                        anticipadas. Además, tendrás prioridad en las reservas y podrás participar
                        en eventos exclusivos de la tienda. Únete hoy y comienza a aprovechar todas
                        las ventajas que Ink Society tiene para ofrecerte. ¡No te lo pierdas!
                    </p>
                    <Link to="/pages/membresia" className="join-button">
                        ¡Únete ahora!
                    </Link>
                </div>
                <div className="membership-image"></div>
            </div>

            {/* Sección de Testimonios */}
            <div className="testimonial-section">
                <h2 className="testimonial-title">Testimonios de usuarios</h2>

                <div className="testimonial-slider">
                    {testimonios.length > 0 ? (
                        testimonios.map((testimonio, index) => (
                            <div
                                key={index}
                                className={`testimonial-slide ${currentIndex === index ? 'active' : ''}`}
                            >
                                {/* Mostrar texto del testimonio */}
                                <p>"{testimonio.testimonioTexto}"</p>
                                {/* Mostrar el nombre del autor */}
                                <h4> {testimonio.nombre}</h4>
                                {/* Mostrar calificación como estrellas */}
                                <div className="stars-container">
                                    {renderStars(testimonio.calificacion)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Cargando testimonios...</p>
                    )}

                    {testimonios.length > 1 && (
                        <div className="controls">
                            <button className="prev" onClick={() => moveSlide(-1)}>
                                &#10094;
                            </button>
                            <button className="next" onClick={() => moveSlide(1)}>
                                &#10095;
                            </button>
                        </div>
                    )}
                </div>

                <div className="button-container">
                    <Link to="/pages/nuevotestimonio" className="add-testimonial-button">
                        ¡Comparte tu experiencia!
                    </Link>
                </div>
            </div>

            {/* Sección de Galería */}
            <section className="gallery-section">
                <h2 className="gallery-title">
                    Explora nuestra galería de tatuajes únicos y  encuentra tu próxima obra maestra.
                </h2>
                <div className="gallery-container">
                    {galeria.length === 0 ? (
                        <p>Cargando galería...</p>
                    ) : (
                        galeria.map((image, index) => (
                            <div key={index} className="gallery-item">
                                <img src={image.imagenTatuaje} alt={`Galería ${index + 1}`} />
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Inicio;
