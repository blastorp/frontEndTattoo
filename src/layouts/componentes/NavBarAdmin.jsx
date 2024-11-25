import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaHome, FaBars, FaSignOutAlt, FaUser, FaTag, FaCreditCard, FaGift, FaImages, FaQuestionCircle, FaComments, FaShoppingCart, FaCalendarAlt, FaStar } from 'react-icons/fa'; // Iconos de React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/navbaradmin.css'; // Vinculamos el archivo de CSS externo
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const NavBarAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Links del menú
  const menuLinks = [
    { label: "Home", icon: <FaHome />, path: "/pages/dashboard" }, // Agregado Home
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
    { label: "Chatbot", icon: <FaComments />, path: "/pages/chatbotadm" }
  ];

  return (
    <div className="navbarA">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Button variant="light" className="menu-button" onClick={toggleMenu}>
          <FaBars />
        </Button>
        <Button variant="danger" className="logout-button">
          <FaSignOutAlt /> 
        </Button>
      </nav>

      {/* Menú lateral */}
      <div className={`menu-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {menuLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="menu-item">
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default NavBarAdmin;
