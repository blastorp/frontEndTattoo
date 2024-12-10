import React from 'react';
import { FaTag, FaCreditCard } from 'react-icons/fa';
import '../estilos/agendaartistaDash.css'; 
import { Link } from 'react-router-dom'; 
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";


const AgendaArtistaADMIN = () => {
  const buttons = [
    { label: "Agregar horarios", icon: <FaCreditCard />, path: "/pages/agendaartistasadd" },
    { label: "Consultar imágenes", icon: <FaTag />, path: "/pages/agendaartistascon" },
  ];

  return (
    <div className="membresia-container">
    <div className="membresia-header">
      <h1>Gestión de Agenda de Artistas</h1>
    </div>
    <div className="membresia-image">
      <img src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset3.jpg?alt=media&token=1d39382d-d388-4a1a-ad7f-ba85fc07ad97" alt="Imagen de membresía" />
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

export default AgendaArtistaADMIN;
