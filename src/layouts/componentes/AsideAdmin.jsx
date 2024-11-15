import React from "react";
import '../estilos/BarraTitulo.css'
import ToILogo from  '../assets/logo.png'


function AsideAdmin({contenidoAside}) {
    

    return (
        <div className="contenedorAsideAdmin">
            <div
            className="contenedorLogo"
            ><img className="ToILogo"
            src={ToILogo} 
            alt="ToILogo"/>
            </div>
            <div className="contenedorContenido">{contenidoAside}</div>
            
        </div>
    );
}


export default AsideAdmin;