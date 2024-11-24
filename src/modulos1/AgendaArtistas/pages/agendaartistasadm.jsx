import React from "react";
import "../estilos/agendaartistaDash.css";
import MainDash from "../../../layouts/MainDash";  // Importa MainDash
import AgendaArtistaADMIN from "../components/agendaartistaAdmin.jsx";  // Importa el componente que deseas mostrar dentro

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/* Aquí pasas el componente DashboardAdmin como children */}
      <div className='contenedorContenidoPagina'>
        <AgendaArtistaADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;
