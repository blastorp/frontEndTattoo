import React from "react";
import "../estilos/chatbotCliente.css";
import MainAdmin from '../../../layouts/MainAdmin'
import ChatbotCLIENTE from "../components/chatbotCliente.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainAdmin tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <ChatbotCLIENTE />
      </div>
    </MainAdmin>
  );
}

export default DashBoard;

