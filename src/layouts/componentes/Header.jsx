import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Asegúrate de importar el JS de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';  // Importa Bootstrap Icons
import logo from '../assets/Logo_TOI.png';  // Ruta del logo
import '../estilos/Header.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark border-0 box-shadow-0 mb-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo como enlace para pantallas pequeñas y grandes */}
          <Link to="/" className="navbar-brand d-block d-sm-none">
            <img src={logo} alt="TempleOfInk" className="logo-img" />
          </Link>

          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-center align-items-center">
            <ul className="navbar-nav flex-grow-1 d-flex align-items-center justify-content-center">
              <li className="nav-item">
                <Link to="/membresia" className="nav-link text-white">
                  Servicios
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/agenda-artistas" className="nav-link text-white">
                  Reservas
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/artistas" className="nav-link text-white">
                  Artistas
                </Link>
              </li>

              {/* Logo visible en pantallas grandes y también es el enlace a /Home */}
              <li className="nav-item d-none d-sm-block">
                <Link to="/" className="nav-link text-white">
                  <img src={logo} alt="TempleOfInk" className="logo-img" />
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/pages/galeria" className="nav-link text-white">
                  Galería
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/consejos" className="nav-link text-white">
                  Consejos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tienda" className="nav-link text-white">
                  {/* Icono de Tienda */}
                  <i className="bi bi-shop"></i>
                </Link>
              </li>
              {/* Dropdown para Perfil */}
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle text-white"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Inicio sesión
                    </Link>
                  </li>
                  <li>
                    <Link to="/registro-usuario" className="dropdown-item">
                      Registro de usuario
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
