import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImagenCuidado from '../../../imagenes/ct6.jpg'
import '../estilos/ArticuloCTInicio.css'

function ArticuloCTInicio() {
    


    return (<section className="articulo-section">
        <h2 className="articulo-title">
            Cuidados del Tattoo
        </h2>
        <h4 className='subtitulo-sec'>Conoce más sobre los cuidados del tatuaje</h4>
        
        <div className="articulo-container">
            <div className="articulo-content">
                <p className="articulo-text">
                    Los cuidados del tatuaje son esenciales para asegurar que tu tatuaje cicatrice correctamente y mantenga su aspecto vibrante. En las primeras 24 horas, debes evitar tocar el tatuaje y mantenerlo limpio. Después, asegúrate de hidratar la piel con una crema específica para tatuajes. Evita la exposición al sol y no rasques el área mientras cicatriza. A medida que el tatuaje se cure, es importante seguir los cuidados recomendados para prevenir infecciones y preservar los detalles de la tinta. También se recomienda evitar actividades que causen sudor excesivo hasta que la cicatrización esté completa.
                </p>
            </div>
    
            <div className="image-frame">
                <div className="image-panorama">
                    <img src={ImagenCuidado} alt="Cuidados del tatuaje" />
                </div>
            </div>
        </div>
    
        <Link to={"/pages/ArticuloCTView"} className="buttonD">
            <span className="boton-link">Ver más sobre los cuidados</span>
        </Link>
    </section>
     );
}

export default ArticuloCTInicio;
