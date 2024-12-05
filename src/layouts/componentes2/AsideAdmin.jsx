import React from "react";
import '../estilos/AsideAdmin.css';
import ToILogo from '../assets/logo.png';

function AsideAdmin({ children }) {
  return (
    <div className="contenedorAsideAdmin">
      <div className="contenedorLogo">
        <img className="ToILogo" src={ToILogo} alt="ToILogo" />
      </div>
      <div className="contenedorContenido">
        {children}
      </div>
    </div>
  );
}

export default AsideAdmin;
