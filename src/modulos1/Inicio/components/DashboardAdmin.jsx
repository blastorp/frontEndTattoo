import React from 'react';
import { 
  FaUser, FaTag, FaCreditCard, FaGift, 
  FaImages, FaQuestionCircle, FaComments, FaShoppingCart, 
  FaCalendarAlt, FaStar 
} from 'react-icons/fa'; // Iconos de React Icons
import '../estilos/dashboard.css'; // Importa el archivo de estilos

const Dashboard = () => {
  // Define los títulos, las acciones y los íconos de los botones
  const buttons = [
    { label: "Perfiles de artistas", icon: <FaUser /> },
    { label: "Ofertas y promociones", icon: <FaTag /> },
    { label: "Membresía", icon: <FaCreditCard /> },
    { label: "Beneficios", icon: <FaGift /> },
    { label: "Tarjetas de regalo", icon: <FaGift /> },
    { label: "Galería de fotos", icon: <FaImages /> },
    { label: "Categorías de tatuajes", icon: <FaImages /> }, // Usamos FaImages para representar categorías
    { label: "Preguntas frecuentes", icon: <FaQuestionCircle /> },
    { label: "Testimonios de usuarios", icon: <FaComments /> },
    { label: "Cuidados de tatuaje", icon: <FaQuestionCircle /> }, // Se puede reutilizar FaQuestionCircle
    { label: "Cotizaciones", icon: <FaCreditCard /> }, // FaCreditCard podría ser apropiado para cotizaciones
    { label: "Agenda de artistas", icon: <FaCalendarAlt /> },
    { label: "Tienda", icon: <FaShoppingCart /> },
    { label: "Calificaciones de los artistas", icon: <FaStar /> },
    { label: "Chatbot", icon: <FaComments /> }, // Usamos FaBars como icono para el chatbot
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Panel de control de Temple of ink</h1>

        {/* Cuadrícula de botones */}
        <div className="button-grid">
          {buttons.map((button, index) => (
            <button key={index} className="dashboard-button">
              {button.icon} {/* Renderiza el ícono */}
              {button.label} {/* Renderiza el texto */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
