import React, { useState } from "react";
import MyNavBar from "./componentes2/Navbar";
import BarraTitulo from "./componentes2/BarraTitulo.jsx";
import AsideAdmin from "./componentes2/AsideAdmin.jsx";
import './estilos/MainAdmin.css';
import AnimacionImagenPan from './componentes/AnimacionImagenPan.jsx'
function MainAdmin({ tituloPagina, children, asideContent }) {
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [sortOption, setSortOption] = useState("name");

  const arrayLinks = [
   
    { nombre: 'Vista Cliente Beneficios', ruta: '/pages/BeneficiosView' },
    { nombre: 'Vista Cliente Categorias', ruta: '/pages/CategoriasView' },
    { nombre: 'DashBoard', ruta: '/pages/DashBoard' },
    // { nombre: 'test', ruta: '/test' },
  ];

  return (
    <div className="contenedorLayout">
      <MyNavBar clasName listaLinks={arrayLinks} />
      <div className="distribucionContenido">
        <div className="contenedorAside">
          { (asideContent)? 
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
        :
        <AsideAdmin>
           <AnimacionImagenPan />
          </AsideAdmin>
        }
          
         
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
