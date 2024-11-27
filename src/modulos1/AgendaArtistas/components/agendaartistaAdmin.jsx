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

export default AgendaArtistaADMIN;
