import React from "react";
import "../estilos/testimoniocon.css";
import MainDash from "../../../layouts/MainDash";  
import TestimonioADMINCON from "../components/testimoniosAdminCon.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <TestimonioADMINCON />
      </div>
    </MainDash>
  );
}

export default DashBoard;