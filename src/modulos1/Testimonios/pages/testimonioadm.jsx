import React from "react";
import "../estilos/testimonioDash.css";
import MainDash from "../../../layouts/MainDash";  
import TestimonioADMIN from "../components/testimoniosAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <TestimonioADMIN />
      </div>
    </MainDash>
  );
}

export default DashBoard;

