import React from "react";
import "../estilos/membresiacon.css";
import MainDash from "../../../layouts/MainDash";  
import MembresiaADMINCON from "../components/membresiaAdminCon.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <MembresiaADMINCON />
      </div>
    </MainDash>
  );
}

export default DashBoard;