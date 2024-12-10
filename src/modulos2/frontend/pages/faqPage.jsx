import React, { useEffect, useState } from 'react';
import { getFaqs } from '../services/faqApi';


const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            const data = await getFaqs();
            setFaqs(data);
        };
        fetchFaqs();
    }, []);

    return (
        <div className="faq-page">
            <h1>Preguntas Frecuentes</h1>
            {faqs.map((faq) => (
                <div key={faq.pregunta_id} className="faq-item">
                    <h2>{faq.pregunta}</h2>
                    <p>{faq.respuesta}</p>
                    {faq.categoria && <small>Categoría: {faq.categoria}</small>}
                </div>
            ))}
        </div>
    );
};

export default FaqPage;
