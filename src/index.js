import React from "react";
import ReactDOM from "react-dom/client";

//import App from './App';
import "./estilosGlobal/estiloGlobal.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Cliente
import Home from "./modulos1/Inicio/pages/Home";

import ArtistasView from "./modulos1/Artistas/pages/ArtistaView";
import ArtistaDetails from "./modulos1/Artistas/pages/ArtistaDetails";

import Galeria from "./modulos1/Galeria/pages/galeria";
import Membresia from "./modulos1/Membresias/pages/membresia";
import AgendaArtistas from "./modulos1/AgendaArtistas/pages/agendaartistas";
import NuevoTestimonio from "./modulos1/Testimonios/pages/nuevotestimonio";

//Administrador
import Dashboard from "./modulos1/Inicio/pages/Dashboard";
import GaleriaAdm from "./modulos1/Galeria/pages/galeriaadm";
import MembresiaAdm from "./modulos1/Membresias/pages/membresiaadm";
import AgendaArtistasAdm from "./modulos1/AgendaArtistas/pages/agendaartistasadm";
import TestimonioAdm from "./modulos1/Testimonios/pages/testimonioadm";
import ChatbotAdm from "./modulos1/Chatbot/pages/chatbotadm";
import ArtistasAddArtista from "./modulos1/Artistas/pages/ArtistasAddArtista";
import ArtistaEditArtista from "./modulos1/Artistas/pages/ArtistaEditArtista";
import ArtistasDash from "./modulos1/Artistas/pages/ArtistasDash";
import ArtistaInfo from "./modulos1/Artistas/pages/ArtistaInfo";
import BeneficiosDash from "./modulos1/Beneficios/Pages/BeneficiosDash";
import AddBeneficio from "./modulos1/Beneficios/Pages/AddBeneficio";
import BeneficioDetails from "./modulos1/Beneficios/Pages/BeneficioDetails";
import BeneficioEdit from "./modulos1/Beneficios/Pages/BeneficioEdit";
import BeneficioInfo from "./modulos1/Beneficios/Pages/BeneficioInfo";
import BeneficiosView from "./modulos1/Beneficios/Pages/BeneficiosView";

//Subpáginas Administrador
import GaleriaAdmAdd from "./modulos1/Galeria/pages/galeriaadd";
import GaleriaAdmCon from "./modulos1/Galeria/pages/galeriacon";
import GaleriaAdmEdit from "./modulos1/Galeria/pages/galeriaedit";

import MembresiaAdmAdd from "./modulos1/Membresias/pages/membresiaadd";
import MembresiaAdmVenta from "./modulos1/Membresias/pages/membresiaventa";
import MembresiaAdmEdit from "./modulos1/Membresias/pages/membresiaedit";
import MembresiaAdmCon from "./modulos1/Membresias/pages/membresiacon";

import AgendaArtistasAdmAdd from "./modulos1/AgendaArtistas/pages/agendaartistasadd";
import AgendaArtistasAdmCon from "./modulos1/AgendaArtistas/pages/agendaartistascon";
import AgendaArtistasAdmEdit from "./modulos1/AgendaArtistas/pages/agendaartistasedit";

import ArtistaView from "./modulos1/Artistas/pages/ArtistaView";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pages/ArtistasDash",
      element: <ArtistasDash />,
    },
    {
      path: "/pages/AddArtista",
      element: <ArtistasAddArtista />,
    },
    {
      path: "/pages/BeneficiosDash",
      element: <BeneficiosDash />,
    },
    {
      path: "/pages/AddBeneficio",
      element: <AddBeneficio />,
    },
    {
      path: "/pages/ArtistasView",
      element: <ArtistasView />,
    },
    {
      path: "/pages/ArtistaDetails/:artistaId",
      element: <ArtistaDetails />,
    },
    {
      path: "/pages/ArtistaEditArtista/:idArt",
      element: <ArtistaEditArtista />,
    },
    {
      path: "/pages/ArtistaInfo/:artistaId",
      element: <ArtistaInfo />,
    },

    { path: "Pages/BeneficioDetails", 
      element: <BeneficioDetails /> },
    { path: "Pages/BeneficioEdit", 
      element: <BeneficioEdit /> },
    { path: "Pages/BeneficioInfo", 
      element: <BeneficioInfo /> },
    { path: "Pages/BeneficiosView", 
      element: <BeneficiosView /> },

    {
      path: "/pages/DashBoard",
      element: <Dashboard />,
    },
    {
      path: "/pages/galeriaaadm",
      element: <GaleriaAdm />,
    },
    {
      path: "/pages/membresiaadm",
      element: <MembresiaAdm />,
    },
    {
      path: "/pages/agendaartistasadm",
      element: <AgendaArtistasAdm />,
    },
    {
      path: "/pages/testimonioadm",
      element: <TestimonioAdm />,
    },
    {
      path: "/pages/chatbotadm",
      element: <ChatbotAdm />,
    },
    {
      path: "/pages/galeriaadd",
      element: <GaleriaAdmAdd />,
    },
    {
      path: "/pages/galeriacon",
      element: <GaleriaAdmCon />,
    },
    {
      path: "/pages/galeriaedit/:id",
      element: <GaleriaAdmEdit />,
    },
    /*{
  path: "/pages/galeriainfo",  
  element: <GaleriaAdmInfo />
},*/
    {
      path: "/pages/membresiaadd",
      element: <MembresiaAdmAdd />,
    },
    {
      path: "/pages/membresiaventa",
      element: <MembresiaAdmVenta />,
    },
    {
      path: "/pages/membresiaedit/:id",
      element: <MembresiaAdmEdit />,
    },
    {
      path: "/pages/membresiacon",
      element: <MembresiaAdmCon />,
    },
    {
      path: "/pages/agendaartistasadd",
      element: <AgendaArtistasAdmAdd />,
    },
    {
      path: "/pages/agendaartistascon",
      element: <AgendaArtistasAdmCon />,
    },
    {
      path: "/pages/agendaartistasedit/:id",
      element: <AgendaArtistasAdmEdit />,
    },
  ],
  {
    basename: "/templeofink", // Agrega el prefijo del subdirectorio
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
