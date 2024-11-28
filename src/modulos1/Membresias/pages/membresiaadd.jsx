import React from "react";
import "../estilos/membresiaadd.css";
import MainDash from "../../../layouts/MainDash";  
import MembresiaADMINADD from "../components/membresiaAdminAdd.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <MembresiaADMINADD />
      </div>
    </MainDash>
  );
}

export default DashBoard;