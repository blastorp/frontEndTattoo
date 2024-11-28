import React from "react";
import MainAdmin from '../../../layouts/MainAdmin1.jsx'
import "../estilos/testimonio.css";
import TestimoniosClientes from "../components/testimoniosClientes.jsx";

function Testimonios({ tituloPagina, children }) {

  return (
    <MainAdmin tituloPagina={"Nuevo Testimonio"}>
        {/*children */}
        <div className='contenedorContenidoPagina' >
            <TestimoniosClientes />
        </div>
    </MainAdmin>
  );
}

export default Testimonios;
