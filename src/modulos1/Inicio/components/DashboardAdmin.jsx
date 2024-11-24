import React from 'react';
import { 
  FaUser, FaTag, FaCreditCard, FaGift, 
  FaImages, FaQuestionCircle, FaComments, FaShoppingCart, 
  FaCalendarAlt, FaStar 
} from 'react-icons/fa'; // Iconos de React Icons
import { Link } from 'react-router-dom'; // Importa el componente Link
import '../estilos/dashboard.css'; // Importa el archivo de estilos

const Dashboard = () => {
  // Define los títulos, las acciones y los íconos de los botones
  const buttons = [
    { label: "Perfiles de artistas", icon: <FaUser />, path: "/perfiles-artistas" },
    { label: "Ofertas y promociones", icon: <FaTag />, path: "/ofertas-promociones" },
    { label: "Membresía", icon: <FaCreditCard />, path: "/membresia" },
    { label: "Beneficios", icon: <FaGift />, path: "/beneficios" },
    { label: "Tarjetas de regalo", icon: <FaGift />, path: "/tarjetas-regalo" },
    { label: "Galería de fotos", icon: <FaImages />, path: "/pages/galeriaaadm" },
    { label: "Categorías de tatuajes", icon: <FaImages />, path: "/categorias-tatuajes" },
    { label: "Preguntas frecuentes", icon: <FaQuestionCircle />, path: "/faq" },
    { label: "Testimonios de usuarios", icon: <FaComments />, path: "/testimonios" },
    { label: "Cuidados de tatuaje", icon: <FaQuestionCircle />, path: "/cuidados-tatuaje" },
    { label: "Cotizaciones", icon: <FaCreditCard />, path: "/cotizaciones" },
    { label: "Agenda de artistas", icon: <FaCalendarAlt />, path: "/agenda-artistas" },
    { label: "Tienda", icon: <FaShoppingCart />, path: "/tienda" },
    { label: "Calificaciones de los artistas", icon: <FaStar />, path: "/calificaciones" },
    { label: "Chatbot", icon: <FaComments />, path: "/chatbot" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Panel de control de Temple of ink</h1>

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
  );
};

export default Dashboard;
