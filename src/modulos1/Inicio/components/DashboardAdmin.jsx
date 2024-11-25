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
    { label: "Perfiles de artistas", icon: <FaUser />, path: "/pages/adm" },
    { label: "Ofertas y promociones", icon: <FaTag />, path: "/pages/adm" },
    { label: "Membresía", icon: <FaCreditCard />, path: "/pages/membresiaadm" },
    { label: "Beneficios", icon: <FaGift />, path: "/pages/adm" },
    { label: "Tarjetas de regalo", icon: <FaGift />, path: "/pages/adm" },
    { label: "Galería de fotos", icon: <FaImages />, path: "/pages/galeriaaadm" },
    { label: "Categorías de tatuajes", icon: <FaImages />, path: "/pages/adm" },
    { label: "Preguntas frecuentes", icon: <FaQuestionCircle />, path: "/pages/adm" },
    { label: "Testimonios de usuarios", icon: <FaComments />, path: "/pages/testimonioadm" },
    { label: "Cuidados de tatuaje", icon: <FaQuestionCircle />, path: "/pages/adm" },
    { label: "Cotizaciones", icon: <FaCreditCard />, path: "/pages/adm" },
    { label: "Agenda de artistas", icon: <FaCalendarAlt />, path: "/pages/agendaartistasadm" },
    { label: "Tienda", icon: <FaShoppingCart />, path: "/pages/adm" },
    { label: "Calificaciones de los artistas", icon: <FaStar />, path: "/pages/adm" },
    { label: "Chatbot", icon: <FaComments />, path: "/pages/chatbotadm" },
  ];

  return (
 <div className="button-panel-container">
      <div className="button-panel">
        {buttons.map((button, index) => (
          <Link key={index} to={button.path} className="button">
            {button.icon} {/* Ícono */}
            <span>{button.label}</span> {/* Título del botón */}
          </Link>
        ))}
      </div>
    </div>
  );
};


export default Dashboard;
