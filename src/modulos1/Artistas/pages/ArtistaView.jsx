import React from 'react'
import MainClient from '../../../layouts/MainClient'
import TarjetaClient from '../components/TarjetaClient';
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import '../estilos/ArtistaView.css'
import { useEffect, useRef, useState } from "react";

function ArtistaView() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await fetchApiM1(ENDPOINTS.GETARTISTAS);
        // setData(result)

        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();


  }, []);
  return (
    <MainClient tituloPagina={"Artistas"}>
        
        <div className='contenedorContenidoPagina' >
        {data.filter((item) => item.publicado)
        .map((item) => (
          <TarjetaClient key={item.idArtista} objetoArtista={item} />
        ))}
        </div>

        
    </MainClient>
   ) 
}

export default ArtistaView;