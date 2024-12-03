import React, { useState } from "react";
import MyNavBar from "./componentes2/Navbar";
import BarraTitulo from "./componentes2/BarraTitulo.jsx";
import AsideAdmin from "./componentes2/AsideAdmin.jsx";
import './estilos/MainAdmin.css';

function MainAdmin({ tituloPagina, children, asideContent }) {
  const arrayLinks = [
    { nombre: 'Mi Dashboard', ruta: '#' },
    { nombre: 'Vista Cliente', ruta: '/pages/ArtistasView' },
    { nombre: 'Artista', ruta: '/pages/ArtistasDash' },
    { nombre: 'Beneficios', ruta: '/pages/BeneficiosDash' },
    { nombre: 'DashBoard', ruta: '/pages/DashBoard' },
  ];

  return (
    <div className="contenedorLayout">
      <MyNavBar clasName listaLinks={arrayLinks} />
      <div className="distribucionContenido">
        <div className="contenedorAside">
          <AsideAdmin>{ asideContent }</AsideAdmin>
        </div>
        <div className="contenedorBarraTitulo">
          <BarraTitulo titulo={tituloPagina} />
        </div>
        <div className="contenedorContenidoPagina">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainAdmin;
