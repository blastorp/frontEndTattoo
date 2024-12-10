import React from 'react';

const OfertaCard = ({ oferta }) => {
    return (
        <div className="oferta-card">
            <h3>{oferta.nombre}</h3>
            <p>{oferta.descripcion}</p>
            <p>
                Vigencia: {oferta.fecha_inicio} - {oferta.fecha_fin}
            </p>
            <p>Descuento: {oferta.descuento}%</p>
        </div>
    );
};

export default OfertaCard;
