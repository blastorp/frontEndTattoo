import React from 'react';
import {FaTag, FaCreditCard } from 'react-icons/fa'; 
import '../estilos/testimonioDash.css'; 
import { Link } from 'react-router-dom'; 


const PalabrasvetadasADMIN = () => {
  const buttons = [
    { label: "Agregar testimonios", icon: <FaTag />, path: "/pages/palabrasvetadasadd" },
    { label: "Consultar palabras vetadas", icon: <FaCreditCard />, path: "/pages/palabrasvetadascon" },
  ];

  return (
    <div className="membresia-container">
    <div className="membresia-header">
      <h1>Gestión de palabras vetadas</h1>
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

export default PalabrasvetadasADMIN;
