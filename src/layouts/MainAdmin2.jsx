import React, { useState } from "react";
import MyNavBar from "./componentes2/Navbar";
import BarraTitulo from "./componentes2/BarraTitulo.jsx";
import AsideAdmin from "./componentes2/AsideAdmin.jsx";
import './estilos/MainAdmin.css';
function MainAdmin({ tituloPagina, children, asideContent }) {
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [sortOption, setSortOption] = useState("name");

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
          <AsideAdmin>
            {React.isValidElement(asideContent)
              ? React.cloneElement(asideContent, {
                  filters,
                  setFilters,
                  sortOption,
                  setSortOption,
                })
              : null}
          </AsideAdmin>
        </div>
        <div className="contenedorBarraTitulo">
          <BarraTitulo titulo={tituloPagina} />
        </div>
        <div className="contenedorContenidoPagina">
          {React.isValidElement(children)
            ? React.cloneElement(children, { filters, sortOption })
            : children}
        </div>
      </div>
    </div>
  );
}


export default MainAdmin;
