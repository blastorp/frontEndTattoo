import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin2'
import TarjetaLinkAdd from '../components/TarjetaLInkAdd'
import ArrayTarjetaApi from '../components/ArrayTarjetaApi'
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import Tarjeta from '../components/Tarjeta'
import '../estilos/ArtistasDash.css'
import { useEffect, useRef, useState } from "react";


function ArtistasDash() {
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
    <MainAdmin tituloPagina={"Administracion Perfiles de Artistas"}>
        
        <div className='contenedorContenidoPagina' >
        <TarjetaLinkAdd />
        {data.map((item) => (
          <Tarjeta key={item.idArtista} objetoArtista={item} />
        ))}
        </div>

        
        
    </MainAdmin>
   ) 
}

export default ArtistasDash;



