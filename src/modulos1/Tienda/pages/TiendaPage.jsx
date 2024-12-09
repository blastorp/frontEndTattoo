import React from "react";
import MainAdmin from "../../../layouts/MainAdmin1";
import "../estilos/TiendaPage.css";
import CarritoDeCompras from "../components/CarritoDeCompras";
import FloatingCart from "../components/FloatingCart";

function TiendaPage() {
  return (
    <MainAdmin tituloPagina={"Tienda"}>
      <FloatingCart />
      <CarritoDeCompras />
    </MainAdmin>
  );
}

export default TiendaPage;
