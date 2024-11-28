import React from "react";
import "../estilos/galeriaadd.css";
import MainDash from "../../../layouts/MainDash";  
import GaleriaADMINADD from "../components/galeriaAdminAdd.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <GaleriaADMINADD />
      </div>
    </MainDash>
  );
}

export default DashBoard;
