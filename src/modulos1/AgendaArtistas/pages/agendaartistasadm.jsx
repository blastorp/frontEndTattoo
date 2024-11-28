import React from "react";
import "../estilos/agendaartistaDash.css";
import MainDash from "../../../layouts/MainDash";  
import AgendaArtistaADMIN from "../components/agendaartistaAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <AgendaArtistaADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;
