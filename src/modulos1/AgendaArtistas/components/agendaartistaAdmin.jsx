import React from 'react';
import { FaTag, FaCreditCard } from 'react-icons/fa'; // Iconos de React Icons
import '../estilos/agendaartistaDash.css'; // Importa el archivo de estilos
import { Link } from 'react-router-dom'; // Importa el componente Link

const AgendaArtistaADMIN = () => {
  // Define los títulos, las acciones y los íconos de los botones
  const buttons = [
    { label: "Consultar imágenes", icon: <FaTag />, path: "/perfiles-artistas" },
    { label: "Editar horarios", icon: <FaCreditCard />, path: "/perfiles-artistas" },
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
