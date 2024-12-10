import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Cambia a la URL de tu backend

export const getGiftCards = async () => {
    const response = await axios.get(`${API_URL}/tarjetas`);
    return response.data;
};

export const createGiftCard = async (giftCard) => {
    const response = await axios.post(`${API_URL}/tarjetas`, giftCard);
    return response.data;
};

export const updateGiftCard = async (id, giftCard) => {
    const response = await axios.put(`${API_URL}/tarjetas/${id}`, giftCard);
    return response.data;
};

export const deleteGiftCard = async (id) => {
    const response = await axios.delete(`${API_URL}/tarjetas/${id}`);
    return response.data;
};
