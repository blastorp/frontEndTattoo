import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaBars, FaSignOutAlt, FaUser, FaTag, FaCreditCard, FaGift, FaImages, FaQuestionCircle, FaComments, FaShoppingCart, FaCalendarAlt, FaStar } from 'react-icons/fa'; // Iconos de React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/navbaradmin.css'; // Vinculamos el archivo de CSS externo

const NavBarAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
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
          <li><FaUser /> Perfiles de artistas</li>
          <li><FaTag /> Ofertas y promociones</li>
          <li><FaCreditCard /> Membresía</li>
          <li><FaGift /> Beneficios</li>
          <li><FaGift /> Tarjetas de regalo</li>
          <li><FaImages /> Galería de fotos</li>
          <li><FaTag /> Categorías de tatuajes</li>
          <li><FaQuestionCircle /> Preguntas frecuentes</li>
          <li><FaComments /> Testimonios de usuarios</li>
          <li><FaImages /> Cuidados de tatuaje</li>
          <li><FaCalendarAlt /> Cotizaciones</li>
          <li><FaCalendarAlt /> Agenda de artistas</li>
          <li><FaShoppingCart /> Tienda</li>
          <li><FaStar /> Calificaciones de los artistas</li>
          <li><FaComments /> Chatbot</li>
        </ul>
      </div>

    </div>
  );
};

export default NavBarAdmin;