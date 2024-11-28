import React from "react";
import MainAdmin from '../../../layouts/MainAdmin'
import "../estilos/agendaartista.css";
import AgendaArtistaCliente from "../components/AgendaArtistaCliente.jsx";

function Galeria({ tituloPagina, children }) {

  return (
    <MainAdmin tituloPagina={"Agenda artistas"}>
        <div className='contenedorContenidoPagina' >
            <AgendaArtistaCliente />
        </div>
    </MainAdmin>
  );
}

export default Galeria;
