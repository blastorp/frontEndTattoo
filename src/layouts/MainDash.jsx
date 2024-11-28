import React from "react";
import NavBarAdmin from "./componentes/NavBarAdmin"; // Importa NavBarAdmin
import './estilos/MainDash.css'; // Importa los estilos

function MainDash({ tituloPagina, children }) {
  return (
    <div>
      {/* Agrega el NavBarAdmin (Header + Menú lateral) */}
      <NavBarAdmin />

      <div className="contenedorContenidoPaginaDash">
        {/* Aquí va el contenido principal */}
        {children}
      </div>
    </div>
  );
}

export default MainDash;
