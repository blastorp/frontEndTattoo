import React from "react";
import "../estilos/chatbotDash.css";
import MainDash from "../../../layouts/MainDash";  
import ChatbotADMIN from "../components/chatbotAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <ChatbotADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;

