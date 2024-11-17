import React, { Children } from "react";
import MyNavBar from "./componentes/Navbar";
import BarraTitulo from "./componentes/BarraTitulo.jsx";
import AsideAdmin from "./componentes/AsideAdmin.jsx";
import './estilos/MainAdmin.css'

function MainAdmin({ tituloPagina, children }) {
    
  const arrayLinks = [
    {nombre: 'Mi Dashboard' , ruta:'#'}, 
    {nombre: 'Vista Cliente' , ruta:'#'},
    {nombre: 'ArtistaDash' , ruta:'/pages/ArtistasDash'},


  ]
    return(
        <div className="contenedorLayout">
            <MyNavBar clasName listaLinks={arrayLinks} />
            <div className="distribucionContenido">
              <div className="contenedorAside">
                <AsideAdmin  />
              </div>
              <div className="contenedorBarraTitulo">

              <BarraTitulo titulo={tituloPagina}/>
              </div>
              <div className="contenedorContenidoPagina">
                {children}
              </div>

              
            </div>
            

        </div>
    );
        
}

export default MainAdmin;