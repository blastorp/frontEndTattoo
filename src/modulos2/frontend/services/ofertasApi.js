import axios from 'axios';

const API_URL = 'http://localhost:4000/api/ofertas';

export const obtenerOfertas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const crearOferta = async (oferta) => {
    const response = await axios.post(API_URL, oferta);
    return response.data;
};
