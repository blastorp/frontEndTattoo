import React from 'react';
import { FaUser, FaTag, FaCreditCard } from 'react-icons/fa'; // Iconos de React Icons
import '../estilos/chatbotDash.css'; // Importa el archivo de estilos
import { Link } from 'react-router-dom'; // Importa el componente Link

const ChatbotADMIN = () => {
  // Define los títulos, las acciones y los íconos de los botones
  const buttons = [
    { label: "Cargar imágenes", icon: <FaUser />, path: "/perfiles-artistas"},
    { label: "Consultar imágenes", icon: <FaTag />, path: "/perfiles-artistas" },
    { label: "Información galería", icon: <FaCreditCard />, path: "/perfiles-artistas" },
  ];

  return (
    <div className="membresia-container">
    <div className="membresia-header">
      <h1>Gestión de Chatbot</h1>
    </div>
    <div className="membresia-image">
      <img src="ruta/a/tu/imagen.jpg" alt="Imagen de membresía" />
    </div>
    <div className="membresia-buttons">
      {buttons.map((button, index) => (
        <Link key={index} to={button.path} className="membresia-button">
          <div className="button-icon">{button.icon}</div>
          <span>{button.label}</span>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default ChatbotADMIN;
