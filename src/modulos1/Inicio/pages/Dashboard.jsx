import React from "react";
import "../estilos/dashboard.css";
import MainDash from "../../../layouts/MainDash";  // Importa MainDash
import DashboardAdmin from "../components/DashboardAdmin.jsx";  // Importa el componente que deseas mostrar dentro

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/* Aquí pasas el componente DashboardAdmin como children */}
      <div className='contenedorContenidoPagina'>
        <DashboardAdmin />
      </div>
    </MainDash>
  );
}

export default DashBoard;
