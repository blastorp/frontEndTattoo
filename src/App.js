
import './App.css';
import MyNavBar from './layouts/navegacionAdmin/navbar';
import { useState } from 'react';

function App() {


  const arrayLinks = [
    {nombre: 'Mi Dashboard' , ruta:'#'}, 
    {nombre: 'Vista Cliente' , ruta:'#'}

  ]



  return (
    <div className="App">
        <MyNavBar listaLinks={arrayLinks} />
    </div>
  );
}

export default App;
