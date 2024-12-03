import React from "react";
import Header from "./componentes/Header.jsx";
import Footer from "./componentes/Footer.jsx";
import './estilos/MainAdmin.css'


function MainAdmin({ tituloPagina, children }) {

  return (
    <div>
      <Header />
      <div className="contenedorContenidoPagina">
        {/* Aquí agregas el menú directamente */}
        <nav>
         
        </nav>

        {/* Contenido principal */}
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainAdmin;
