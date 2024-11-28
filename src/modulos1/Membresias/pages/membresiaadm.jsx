import React from "react";
import "../estilos/membresiaDash.css";
import MainDash from "../../../layouts/MainDash";  
import MembresiaADMIN from "../components/membresiaAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <MembresiaADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;