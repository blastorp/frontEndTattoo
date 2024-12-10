import React from 'react';
import { FaUser, FaTag } from 'react-icons/fa'; // Iconos de React Icons
import '../estilos/membresiaDash.css'; // Importa el archivo de estilos
import { Link } from 'react-router-dom'; // Importa el componente Link
//import fetchApiM2  from "../../../services/api/fetchApiM2";
//import ENDPOINTS  from "../../../services/api/endpoints";

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
        <img src="https://firebasestorage.googleapis.com/v0/b/templeofinkgallery.firebasestorage.app/o/assets%2FAsset1.jpg?alt=media&token=31ed0272-adf9-4e34-9506-8cac603a50a3" alt="Imagen de membresía" />
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
