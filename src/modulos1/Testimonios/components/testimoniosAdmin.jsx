import React from 'react';
import {FaTag, FaCreditCard } from 'react-icons/fa'; 
import '../estilos/testimonioDash.css'; 
import { Link } from 'react-router-dom'; 

const TestimonioADMIN = () => {
  const buttons = [
    { label: "Consultar testimonios", icon: <FaTag />, path: "/pages/testimoniocon" },
    { label: "Palabras vetadas", icon: <FaCreditCard />, path: "/pages/palabrasvetadasadm" },
  ];

  return (
    <div className="membresia-container">
    <div className="membresia-header">
      <h1>Gestión de Testimonios</h1>
    </div>
    <div className="membresia-image">
      <img src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset12.jpg?alt=media&token=2c961e53-5079-4b87-b9c4-5f7c719e1228" alt="Imagen de membresía" />
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

export default TestimonioADMIN;
