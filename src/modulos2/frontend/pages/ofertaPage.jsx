import React, { useEffect, useState } from 'react';
import OfertaForm from '../components/ofertas/ofertaForm';
import OfertaList from '../components/ofertas/ofertaList';
import { obtenerOfertas, crearOferta } from '../services/ofertasApi';

const OfertasPage = () => {
    const [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        obtenerOfertas().then(setOfertas);
    }, []);

    const agregarOferta = (nuevaOferta) => {
        crearOferta(nuevaOferta).then((oferta) => {
            setOfertas([...ofertas, oferta]);
        });
    };

    return (
        <div>
            <h1>Ofertas</h1>
            <OfertaForm onSubmit={agregarOferta} />
            <OfertaList ofertas={ofertas} />
        </div>
    );
};

export default OfertasPage;
