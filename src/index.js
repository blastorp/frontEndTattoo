import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './estilosGlobal/estiloGlobal.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ArtistasDash from './modulos1/Artistas/pages/ArtistasDash';
import ArtistasAddArtista from './modulos1/Artistas/pages/ArtistasAddArtista';

import ArtistaEditArtista from  './modulos1/Artistas/pages/ArtistaEditArtista'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/pages/ArtistasDash",
    element: <ArtistasDash />
  },
  {
    path: "/pages/AddArtista",
    element: <ArtistasAddArtista />
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

