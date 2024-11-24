import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/inicioC.css";

const Inicio = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const moveSlide = (direction) => {
        setCurrentIndex((prevIndex) => (prevIndex + direction + 3) % 3);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveSlide(1);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

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
                <div className="membership-image">
                    <img src="/src/layouts/assets/Membresia.png" alt="Membresía" />
                </div>
            </div>

            {/* Sección de Testimonios */}
            <div className="testimonial-section">
                <h2 className="testimonial-title">Testimonios de usuarios</h2>

                <div className="testimonial-slider">
                    <div className={`testimonial-slide ${currentIndex === 0 ? 'active' : ''}`}>
                        <p>"Excelente servicio, me encantó el resultado final."</p>
                        <h4>- Juan Pérez</h4>
                    </div>
                    <div className={`testimonial-slide ${currentIndex === 1 ? 'active' : ''}`}>
                        <p>"Un ambiente increíble y los tatuadores son muy profesionales."</p>
                        <h4>- María López</h4>
                    </div>
                    <div className={`testimonial-slide ${currentIndex === 2 ? 'active' : ''}`}>
                        <p>"Totalmente recomendado, el mejor estudio de tatuajes."</p>
                        <h4>- Carlos Díaz</h4>
                    </div>

                    <div className="controls">
                        <button className="prev" onClick={() => moveSlide(-1)}>&#10094;</button>
                        <button className="next" onClick={() => moveSlide(1)}>&#10095;</button>
                    </div>
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
                    Explora nuestra galería de tatuajes únicos y encuentra tu próxima obra maestra.
                </h2>
                <div className="gallery-container">
                    {/* Aquí puedes agregar las imágenes de los tatuajes */}
                    <div className="gallery-item">
                        <img src="/src/layouts/assets/tatuaje1.jpg" alt="Tatuaje 1" />
                    </div>
                    <div className="gallery-item">
                        <img src="/src/layouts/assets/tatuaje2.jpg" alt="Tatuaje 2" />
                    </div>
                    <div className="gallery-item">
                        <img src="/src/layouts/assets/tatuaje3.jpg" alt="Tatuaje 3" />
                    </div>
                    <div className="gallery-item">
                        <img src="/src/layouts/assets/tatuaje4.jpg" alt="Tatuaje 4" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
