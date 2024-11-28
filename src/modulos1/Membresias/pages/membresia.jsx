import React from "react";
import MainAdmin from '../../../layouts/MainAdmin1.jsx'
import '../estilos/membresia.css'
import MembresiaCliente from "../components/membresiaCliente.jsx";

function Membresia({ tituloPagina, children }) {

  return (
    <MainAdmin tituloPagina={"Membresia"}>
        <div className='contenedorContenidoPagina' >
            <MembresiaCliente />
        </div>
    </MainAdmin>
  );
}

export default Membresia;
