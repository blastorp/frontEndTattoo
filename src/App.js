
import './App.css';
import MyNavBar from './layouts/componentes/Navbar';
import MainAdmin from './layouts/MainAdmin';

import { useState } from 'react';

function App() {


  const arrayLinks = [
    {nombre: 'Mi Dashboard' , ruta:'#'}, 
    {nombre: 'Vista Cliente' , ruta:'#'}

  ]
const titulo = "sjdfla"


  return (
    <div className="App">
        <MainAdmin tituloPagina={titulo} />
        {/* <BarraTitulo titulo={titulo}/> */}
        
    </div>
  );
}

export default App;
