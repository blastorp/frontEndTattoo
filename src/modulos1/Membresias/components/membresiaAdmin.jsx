import React from 'react';
import { FaUser, FaTag, FaCreditCard } from 'react-icons/fa'; // Iconos de React Icons
import '../estilos/membresiaDash.css'; // Importa el archivo de estilos
import { Link } from 'react-router-dom'; // Importa el componente Link

const MembresiaADMIN = () => {
  // Define los títulos, las acciones y los íconos de los botones
  const buttons = [
    { label: "Crear membresia", icon: <FaUser />, path: "/perfiles-artistas"},
    { label: "Consultar membresia", icon: <FaTag />, path: "/perfiles-artistas" },
    { label: "Editar membresia", icon: <FaTag />, path: "/perfiles-artistas" },
    { label: "Ventas membresia", icon: <FaTag />, path: "/perfiles-artistas" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Panel de control de Temple of Ink</h1>

        {/* Contenedor con la foto y los botones */}
        <div className="button-grid-container">
          {/* Foto */}
          <div className="dashboard-photo">
            <img src="ruta-a-tu-foto.jpg" alt="Foto de perfil" />
          </div>

         {/* Cuadrícula de botones como enlaces */}
          <div className="button-grid">
            {buttons.map((button, index) => (
              <Link 
                key={index} 
                to={button.path} 
                className="dashboard-button"
              >
                {button.icon} {/* Renderiza el ícono */}
                {button.label} {/* Renderiza el texto */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembresiaADMIN;
