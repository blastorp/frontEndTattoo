import React, { useState } from 'react';
import fetchApiM2 from "../../../services/api/fetchApiM2";
import ENDPOINTS from "../../../services/api/endpoints";
import '../estilos/chatbotCliente.css';

const ChatbotCliente = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetchApiM2(ENDPOINTS.CREATE_INTERACCIONES_CHATBOT_REGISTRAR, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Pregunta: input,
                    Respuesta: "Respuesta simulada", // Puedes cambiar esto por lógica para obtener respuesta del servidor
                }),
            });

            const botMessage = { sender: "bot", text: response.Respuesta };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }

        setInput("");
    };

    return (
        <div className="chat-container">
            <div className="header">
                <h4>Chatbot</h4>
                <span alt="Close" id="cross" onClick={() => setMessages([])}>X</span>
            </div>
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className="message"
                        style={{
                            alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                            backgroundColor: message.sender === "user" ? "#2F8D46" : "#e5e5ea",
                            color: message.sender === "user" ? "white" : "black",
                        }}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    className="input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
            </div>   
                <button className="send-button" onClick={handleSend}>
                    Enviar
                </button>
           
        </div>
    );
};

export default ChatbotCliente;
