import React from "react";
import "../estilos/agendaartistaadd.css";
import MainDash from "../../../layouts/MainDash";  
import AgendaArtistaADMINADD from "../components/agendaartistaAdminAdd.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <AgendaArtistaADMINADD />
      </div>
    </MainDash>
  );
}

export default DashBoard;
