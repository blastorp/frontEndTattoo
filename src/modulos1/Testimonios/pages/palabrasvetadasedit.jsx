import React from "react";
import "../estilos/palabrasvetadasaddedit.css";
import MainDash from "../../../layouts/MainDash";  
import PalabrasVetadasADMINEdit from "../components/palabrasvetadasAdminEdit.jsx";  

function DashBoard({ tituloPagina, children }) {
  return (
    <MainDash tituloPagina={tituloPagina}>
      {/*children */}
      <div className='contenedorContenidoPagina'>
        <PalabrasVetadasADMINEdit />
      </div>
    </MainDash>
  );
}

export default DashBoard;