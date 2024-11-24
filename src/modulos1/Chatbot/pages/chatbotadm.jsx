import React from "react";
import "../estilos/chatbotDash.css";
import MainDash from "../../../layouts/MainDash";  // Importa MainDash
import ChatbotADMIN from "../components/chatbotAdmin.jsx";  // Importa el componente que deseas mostrar dentro

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/* Aquí pasas el componente DashboardAdmin como children */}
      <div className='contenedorContenidoPagina'>
        <ChatbotADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;

