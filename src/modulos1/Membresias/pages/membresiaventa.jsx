import React from "react";
import "../estilos/membresiaventa.css";
import MainDash from "../../../layouts/MainDash";  
import MembresiaADMINVENTA from "../components/membresiaAdminVenta.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <MembresiaADMINVENTA />
      </div>
    </MainDash>
  );
}

export default DashBoard;