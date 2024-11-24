import React from 'react';
import ReactDOM from 'react-dom/client';

//import App from './App';
import './estilosGlobal/estiloGlobal.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './modulos1/Inicio/pages/Home';
import ArtistasDash from './modulos1/Artistas/pages/ArtistasDash';
import ArtistaEditArtista from  './modulos1/Artistas/pages/ArtistaEditArtista'
import Galeria from './modulos1/Galeria/pages/galeria';
import Membresia from './modulos1/Membresias/pages/membresia';
import AgendaArtistas from './modulos1/AgendaArtistas/pages/agendaartistas';
import NuevoTestimonio from './modulos1/Testimonios/pages/nuevotestimonio';
import Dashboard from './modulos1/Inicio/pages/Dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/pages/ArtistasDash",
    element: <ArtistasDash />
  },
  {
    path: "/pages/ArtistaEditArtista",
    element: <ArtistaEditArtista />
  },
  {
    path: "/pages/galeria",
    element: <Galeria />
  },
  {
    path: "/pages/membresia",
    element: <Membresia />
  },
  {
    path: "/pages/agendaartistas",
    element: <AgendaArtistas />
  },
  {
    path: "/pages/nuevotestimonio",  
    element: <NuevoTestimonio />
  },
  {
    path: "/pages/dashboard",  
    element: <Dashboard />
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

