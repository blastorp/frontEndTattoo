import React from "react";
import "../estilos/galeriacon.css";
import MainDash from "../../../layouts/MainDash";  
import GaleriaADMINEDIT from "../components/galeriaAdminEdit.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <GaleriaADMINEDIT />
      </div>
    </MainDash>
  );
}

export default DashBoard;
