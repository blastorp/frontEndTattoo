import React from "react";
import MainAdmin from '../../../layouts/MainAdmin'
import '../estilos/galeria.css'
import GaleriaCliente from "../components/galeriaCliente.jsx";

function Galeria({ tituloPagina, children }) {

  return (
    <MainAdmin tituloPagina={"Galería"}>
        <div className='contenedorContenidoPagina' >
            <GaleriaCliente />
        </div>
    </MainAdmin>
  );
}

export default Galeria;
