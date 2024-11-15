import React from "react";
import MyNavBar from "./componentes/Navbar";
import BarraTitulo from "./componentes/BarraTitulo.jsx";
import AsideAdmin from "./componentes/AsideAdmin.jsx";


function MainAdmin({tituloPagina}) {
    
  const arrayLinks = [
    {nombre: 'Mi Dashboard' , ruta:'#'}, 
    {nombre: 'Vista Cliente' , ruta:'#'}

  ]
    return(
        <div>
            <MyNavBar clasName listaLinks={arrayLinks} />
            <AsideAdmin  />
            <BarraTitulo titulo={tituloPagina}/>

        </div>
    );
        
}

export default MainAdmin;