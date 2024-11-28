import React from "react";
import "../estilos/galeriainfo.css";
import MainDash from "../../../layouts/MainDash";  
import GaleriaADMININFO from "../components/galeriaAdminInfo.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <GaleriaADMININFO />
      </div>
    </MainDash>
  );
}

export default DashBoard;
