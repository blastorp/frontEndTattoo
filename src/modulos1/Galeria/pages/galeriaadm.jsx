import React from "react";
import "../estilos/galeriaDash.css";
import MainDash from "../../../layouts/MainDash";  
import GaleriaADMIN from "../components/galeriaAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <GaleriaADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;
