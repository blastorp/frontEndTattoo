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
    );
};

export default Inicio;
