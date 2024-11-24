import React from "react";
import "../estilos/galeriaDash.css";
import MainDash from "../../../layouts/MainDash";  // Importa MainDash
import GaleriaADMIN from "../components/galeriaAdmin.jsx";  // Importa el componente que deseas mostrar dentro

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/* Aquí pasas el componente DashboardAdmin como children */}
      <div className='contenedorContenidoPagina'>
        <GaleriaADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;
