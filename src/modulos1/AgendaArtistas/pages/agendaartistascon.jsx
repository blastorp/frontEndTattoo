import React from "react";
import "../estilos/agendaartistascon.css";
import MainDash from "../../../layouts/MainDash";  
import AgendaArtistaADMINCON from "../components/agendaartistaAdminCon.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <AgendaArtistaADMINCON />
      </div>
    </MainDash>
  );
}

export default DashBoard;
