import './App.css';
import MyNavBar from './layouts/componentes/Navbar';
import MainAdmin from './layouts/MainAdmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';


import { useState } from 'react';

function App() {


  const arrayLinks = [
    {nombre: 'Mi Dashboard' , ruta:'#'}, 
    {nombre: 'Vista Cliente' , ruta:'#'}

  ]
const titulo = "Prueba Titulo"


  return (
    <div className="App">
        <MainAdmin tituloPagina={titulo} />
        
        
    </div>
  );
}

const App = () => {
  return (
      <div>
          <Login />
          <Register />
      </div>
  );
};

export default App;
