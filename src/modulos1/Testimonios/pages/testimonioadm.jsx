import React from "react";
import "../estilos/testimonioDash.css";
import MainDash from "../../../layouts/MainDash";  // Importa MainDash
import TestimonioADMIN from "../components/testimoniosAdmin.jsx";  // Importa el componente que deseas mostrar dentro

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/* Aquí pasas el componente DashboardAdmin como children */}
      <div className='contenedorContenidoPagina'>
        <TestimonioADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;

