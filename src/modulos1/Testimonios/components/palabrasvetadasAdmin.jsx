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
      <img src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset11.jpg?alt=media&token=d45ce3e8-c408-44e0-a74c-38e6a399faf5" alt="Imagen de membresía" />
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
