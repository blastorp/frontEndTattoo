import React from "react";
import '../estilos/BarraTitulo.css'


function BarraTitulo({titulo}) {
    

    return (
        <div className="contenedorBarraTitulo">
            <h3 className="titulo">{titulo}</h3>
        </div>
    );
}


export default BarraTitulo;