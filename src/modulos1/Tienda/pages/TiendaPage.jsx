import React from "react";
import MainAdmin from "../../../layouts/MainAdmin1";
import "../estilos/TiendaPage.css";
import { CartProvider } from "./../../../state/CartContext";

import CarritoDeCompras from "../components/CarritoDeCompras";
import FloatingCart from "../components/FloatingCart";

function TiendaPage() {
  return (
    <CartProvider>
      <MainAdmin tituloPagina={"Tienda"}>
        <FloatingCart />
        <CarritoDeCompras />
      </MainAdmin>
    </CartProvider>
  );
}

export default TiendaPage;
