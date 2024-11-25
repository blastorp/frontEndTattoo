import React from "react";
import "../estilos/membresiaedit.css";
import MainDash from "../../../layouts/MainDash";  
import MembresiaADMINEDIT from "../components/membresiaAdminEdit.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <MembresiaADMINEDIT />
      </div>
    </MainDash>
  );
}

export default DashBoard;