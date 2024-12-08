import React from "react";
import "../estilos/palabrasvetadascon.css";
import MainDash from "../../../layouts/MainDash.jsx";  
import PalabrasvetadasADMINCON from "../components/palabrasvetadasAdminCon.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <PalabrasvetadasADMINCON />
      </div>
    </MainDash>
  );
}

export default DashBoard;