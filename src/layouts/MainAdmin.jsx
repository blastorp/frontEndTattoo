import React from "react";
import Header from "./componentes/Header.jsx";
import Footer from "./componentes/Footer.jsx";
import './estilos/MainAdmin.css'


function MainAdmin({ tituloPagina, children }) {
    
  const arrayLinks = [
    {nombre: 'Mi Dashboard' , ruta:'#'}, 
    {nombre: 'Vista Cliente' , ruta:'/pages/ArtistaView'},
    {nombre: 'Artista' , ruta:'/pages/ArtistasDash'},
    {nombre: 'Beneficios' , ruta:'/pages/BeneficiosDash'},


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
