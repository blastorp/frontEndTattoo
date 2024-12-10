import React from "react";
import "../estilos/palabrasvetadasaddedit.css";
import MainDash from "../../../layouts/MainDash";  
import PalabrasVetadasADMINAdd from "../components/palabrasvetadasAdminAdd.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <PalabrasVetadasADMINAdd />
      </div>
    </MainDash>
  );
}

export default DashBoard;