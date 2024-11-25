import React from "react";
import "../estilos/galeriacon.css";
import MainDash from "../../../layouts/MainDash";  
import GaleriaADMINCON from "../components/galeriaAdminCon.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <GaleriaADMINCON />
      </div>
    </MainDash>
  );
}

export default DashBoard;
