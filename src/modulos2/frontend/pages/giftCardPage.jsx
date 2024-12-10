import React, { useState, useEffect } from 'react';
import { getGiftCards } from '../services/giftCardsApi';


const GiftCardPage = () => {
    const [giftCards, setGiftCards] = useState([]);

    useEffect(() => {
        const fetchGiftCards = async () => {
            const data = await getGiftCards();
            setGiftCards(data);
        };
        fetchGiftCards();
    }, []);

    return (
        <div className="gift-card-page">
            <h1>Gestión de Tarjetas de Regalo</h1>
            <ul>
                {giftCards.map((card) => (
                    <li key={card.tarjeta_id}>
                        Código: {card.codigo} - Valor: ${card.valor}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiftCardPage;
