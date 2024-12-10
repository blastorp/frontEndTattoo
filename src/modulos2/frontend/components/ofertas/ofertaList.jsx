import React from 'react';
import OfertaCard from './ofertaCard';

const OfertaList = ({ ofertas }) => {
    return (
        <div className="oferta-list">
            {ofertas.map((oferta) => (
                <OfertaCard key={oferta.oferta_id} oferta={oferta} />
            ))}
        </div>
    );
};

export default OfertaList;
