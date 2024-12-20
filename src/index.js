import React from 'react';
import ReactDOM from 'react-dom/client';

//import App from './App';
import './estilosGlobal/estiloGlobal.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Cliente
import Home from './modulos1/Inicio/pages/Home';
import ArtistasDash from './modulos1/Artistas/pages/ArtistasDash';
import ArtistaEditArtista from  './modulos1/Artistas/pages/ArtistaEditArtista'
import Galeria from './modulos1/Galeria/pages/galeria';
import Membresia from './modulos1/Membresias/pages/membresia';
import AgendaArtistas from './modulos1/AgendaArtistas/pages/agendaartistas';
import NuevoTestimonio from './modulos1/Testimonios/pages/nuevotestimonio';
import Chatbot from './modulos1/Chatbot/pages/chatbot';

//Administrador
import Dashboard from './modulos1/Inicio/pages/Dashboard';
import GaleriaAdm from './modulos1/Galeria/pages/galeriaadm';
import MembresiaAdm from './modulos1/Membresias/pages/membresiaadm';
import AgendaArtistasAdm from './modulos1/AgendaArtistas/pages/agendaartistasadm';
import TestimonioAdm from './modulos1/Testimonios/pages/testimonioadm';
import ChatbotAdm from './modulos1/Chatbot/pages/chatbotadm';
import PalabrasVetadasAdm from './modulos1/Testimonios/pages/palabrasvetadasadm';

//Subpáginas Administrador
import GaleriaAdmAdd from './modulos1/Galeria/pages/galeriaadd';
import GaleriaAdmCon from './modulos1/Galeria/pages/galeriacon';
import GaleriaAdmEdit from './modulos1/Galeria/pages/galeriaedit';

import MembresiaAdmAdd from './modulos1/Membresias/pages/membresiaadd';
import MembresiaAdmVenta from './modulos1/Membresias/pages/membresiaventa';
import MembresiaAdmEdit from './modulos1/Membresias/pages/membresiaedit';
import MembresiaAdmCon from './modulos1/Membresias/pages/membresiacon';

import AgendaArtistasAdmAdd from './modulos1/AgendaArtistas/pages/agendaartistasadd';
import AgendaArtistasAdmCon from './modulos1/AgendaArtistas/pages/agendaartistascon';
import AgendaArtistasAdmEdit from './modulos1/AgendaArtistas/pages/agendaartistasedit';

import TestimoniosAdmCon from './modulos1/Testimonios/pages/testimoniocon';
import PalabrasVetadasAdmCon from './modulos1/Testimonios/pages/palabrasvetadascon';
import PalabrasVetadasAdmAdd from './modulos1/Testimonios/pages/palabrasvetadasadd';
import PalabrasVetadasAdmEdit from './modulos1/Testimonios/pages/palabrasvetadasedit';


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
  {
    path: "/pages/galeriaaadm",  
    element: <GaleriaAdm />
  },
  {
    path: "/pages/membresiaadm",  
    element: <MembresiaAdm />
  },
  {
    path: "/pages/agendaartistasadm",  
    element: <AgendaArtistasAdm />
  },
  {
    path: "/pages/testimonioadm",  
    element: <TestimonioAdm />
  },
  {
    path: "/pages/chatbotadm",  
    element: <ChatbotAdm />
  },
  {
    path: "/pages/palabrasvetadasadm",  
    element: <PalabrasVetadasAdm />
  },
  {
    path: "/pages/galeriaadd",  
    element: <GaleriaAdmAdd />
  },
  {
    path: "/pages/galeriacon",  
    element: <GaleriaAdmCon />
  },
  {
    path: "/pages/galeriaedit/:id",  
    element: <GaleriaAdmEdit />
  },
  /*{
    path: "/pages/galeriainfo",  
    element: <GaleriaAdmInfo />
  },*/
  {
    path: "/pages/membresiaadd",  
    element: <MembresiaAdmAdd />
  },
  {
    path: "/pages/membresiaventa",  
    element: <MembresiaAdmVenta />
  },
  {
    path: "/pages/membresiaedit/:id",  
    element: <MembresiaAdmEdit />
  },
  {
    path: "/pages/membresiacon",  
    element: <MembresiaAdmCon />
  },
   {
    path: "/pages/agendaartistasadd",  
    element: <AgendaArtistasAdmAdd />
  },
  {
    path: "/pages/agendaartistascon",  
    element: <AgendaArtistasAdmCon />
  },
  {
    path: "/pages/agendaartistasedit/:id",  
    element: <AgendaArtistasAdmEdit />
  },
  {
    path: "/pages/testimoniocon",  
    element: <TestimoniosAdmCon />
  },
  {
    path: "/pages/palabrasvetadascon",  
    element: <PalabrasVetadasAdmCon />
  },
  {
    path: "/pages/palabrasvetadasadd",  
    element: <PalabrasVetadasAdmAdd />
  },
  {
    path: "/pages/palabrasvetadasedit/:id",  
    element: <PalabrasVetadasAdmEdit />
  },
  {
    path: "/pages/chatbot",  
    element: <Chatbot />
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

