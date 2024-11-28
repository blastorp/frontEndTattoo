import React from "react";
import "../estilos/dashboard.css";
import MainDash from "../../../layouts/MainDash";  
import DashboardAdmin from "../components/DashboardAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <DashboardAdmin />
      </div>
    </MainDash>
  );
}

export default DashBoard;
