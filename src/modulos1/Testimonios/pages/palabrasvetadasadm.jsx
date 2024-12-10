import React from "react";
import "../estilos/testimonioDash.css";
import MainDash from "../../../layouts/MainDash";  
import PalabrasvetadasADMIN from "../components/palabrasvetadasAdmin.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        < PalabrasvetadasADMIN/>
      </div>
    </MainDash>
  );
}

export default DashBoard;

