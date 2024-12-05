import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/inicioC.css";
//import fetchApiM2  from "../../../services/api/fetchApiM2";
//import ENDPOINTS  from "../../../services/api/endpoints";

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
                    Explora nuestra galería de tatuajes únicos y  encuentra tu próxima obra maestra.
                </h2>
                <div className="gallery-container">
                    {/* Aquí puedes agregar las imágenes de los tatuajes */}
                    <div className="gallery-item">
                    <img src="https://wildwomantattoo.com/wp-content/uploads/2021/09/Tatuaje-Li%CC%81nea-fina-010_s1500.jpg" alt="TempleOfInk" />
                    </div>
                    <div className="gallery-item">
                    <img src="https://lh3.googleusercontent.com/proxy/vCgchtPF6jeqgtnSer80D5FAJfeBrsB_cZk9iKLnnk6TlGPVbicLk8I5uT0rrPTBSE8cAzG7PG30PQLGTKAw6wVepT5x_KRxcyZx1ox2cRRw6ddo4fIe33AmDcCsllYJd-S0_eYOFvJJRjX1EpUoyFk7GWBjCcB8CPqrwU6TPBwbbtXLmQ" alt="TempleOfInk" />
                    </div>
                    <div className="gallery-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpXj50NVG2G7QldsGnpPqfa3WEwntwXhMcDA&s" alt="TempleOfInk" />
                    </div>
                    <div className="gallery-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFaKNVFe6Qf26w6fxL96SzDriqcWEh6wCjQ&s" alt="TempleOfInk" />
                    </div>
                    <div className="gallery-item">
                    <img src="https://content.clara.es/medio/2023/05/22/tatuaje-brujula-minimalista_6cfa6b49_230522213108_1200x630.jpg" alt="TempleOfInk" />
                    </div>
                    <div className="gallery-item">
                    <img src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,q_auto,w_1200/v1606814404/blog-post-open-graph-covers/000/005/917/5917-original.png?1606814404" alt="TempleOfInk" />
                    </div>
                    <div className="gallery-item">
                    <img src="https://www.avantgardetattoo.es/storage/2020/03/1-scaled.jpg" alt="TempleOfInk" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
