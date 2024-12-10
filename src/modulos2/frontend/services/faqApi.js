import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Cambia a la URL de tu backend

export const getFaqs = async () => {
    const response = await axios.get(`${API_URL}/faqs`);
    return response.data;
};

export const createFaq = async (faq) => {
    const response = await axios.post(`${API_URL}/faqs`, faq);
    return response.data;
};

export const updateFaq = async (id, faq) => {
    const response = await axios.put(`${API_URL}/faqs/${id}`, faq);
    return response.data;
};

export const deleteFaq = async (id) => {
    const response = await axios.delete(`${API_URL}/faqs/${id}`);
    return response.data;
};
