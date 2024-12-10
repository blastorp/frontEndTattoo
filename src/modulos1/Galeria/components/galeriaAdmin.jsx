import React from 'react';
import { FaUser, FaTag, FaCreditCard } from 'react-icons/fa'; 
import '../estilos/galeriaDash.css'; 
import { Link } from 'react-router-dom'; 

const GaleriaADMIN = () => {
  const buttons = [
    { label: "Cargar imágenes", icon: <FaUser />, path: "/pages/galeriaadd"},
    { label: "Consultar imágenes", icon: <FaTag />, path: "/pages/galeriacon" },
    { label: "Información galería", icon: <FaCreditCard />, path: "/perfiles-artistas" },
  ];

  return (
    <div className="membresia-container">
    <div className="membresia-header">
      <h1>Gestión de Galería</h1>
    </div>
    <div className="membresia-image">
      <img src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset10.jpg?alt=media&token=47440525-efe4-422a-8483-f1c0c567f095" alt="Imagen de membresía" />
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

export default GaleriaADMIN;
