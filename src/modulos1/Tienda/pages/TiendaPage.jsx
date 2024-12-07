import React from "react";
import MainAdmin from "../../../layouts/MainAdmin1";
import "../estilos/TiendaPage.css";
import { CartProvider } from "./../../../state/CartContext";

import CarritoDeCompras from "../components/CarritoDeCompras";
import FloatingCartIcon from "../components/CartIcon";

function TiendaPage() {
  return (
      <CartProvider>
        <MainAdmin tituloPagina={"Tienda"}>
          <FloatingCartIcon />
          <CarritoDeCompras />
        </MainAdmin>
      </CartProvider>
  );
}

export default TiendaPage;