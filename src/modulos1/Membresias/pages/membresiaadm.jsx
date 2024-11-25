import React from "react";
import "../estilos/membresiaDash.css";
import MainDash from "../../../layouts/MainDash";  // Importa MainDash
import MembresiaADMIN from "../components/membresiaAdmin.jsx";  // Importa el componente que deseas mostrar dentro

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/* Aquí pasas el componente DashboardAdmin como children */}
      <div className='contenedorContenidoPagina'>
        <MembresiaADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;