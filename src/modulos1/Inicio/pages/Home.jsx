import React from "react";
import MainAdmin from '../../../layouts/MainAdmin1.jsx'
import "../estilos/inicioC.css";
import InicioCliente from "../components/inicioCliente.jsx";

function Inicio({ tituloPagina, children }) {

  return (
    <MainAdmin tituloPagina={"Inicio"}>
        <div className='contenedorContenidoPagina' >
            <InicioCliente />
        </div>
    </MainAdmin>
  );
}

export default Inicio;
