import React from "react";
import "../estilos/agendaartistasedit.css";
import MainDash from "../../../layouts/MainDash";  
import AgendaArtistaADMINEDIT from "../components/agendaartistaAdminEdit.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <AgendaArtistaADMINEDIT />
      </div>
    </MainDash>
  );
}

export default DashBoard;
