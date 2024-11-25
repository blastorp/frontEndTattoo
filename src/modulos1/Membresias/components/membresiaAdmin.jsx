import React from 'react';
import { FaUser, FaTag } from 'react-icons/fa'; // Iconos de React Icons
import '../estilos/membresiaDash.css'; // Importa el archivo de estilos
import { Link } from 'react-router-dom'; // Importa el componente Link

const MembresiaADMIN = () => {
  // Define los títulos, las acciones y los íconos de los botones
  const buttons = [
    { label: "Crear membresia", icon: <FaUser />, path: "/pages/membresiaadd"},
    { label: "Consultar membresia", icon: <FaTag />, path: "/pages/membresiacon" },
    { label: "Ventas membresia", icon: <FaTag />, path: "/pages/membresiaventa" },
  ];

  return (
    <div className="membresia-container">
      <div className="membresia-header">
        <h1>Gestión de Membresías</h1>
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

export default MembresiaADMIN;
