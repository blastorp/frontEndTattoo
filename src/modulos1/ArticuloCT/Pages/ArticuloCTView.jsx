import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin2';
import TarjetaClient from '../components/TarjetaClient';
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import '../estilos/ArticuloCTView.css'
import { useEffect, useRef, useState } from "react";


function ArticuloCTView() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await fetchApiM1(ENDPOINTS.GETARTICULOS);
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
    <MainAdmin tituloPagina={"Articulos del Cuidado Del Tatto"}>
        
        <div className='contenedorContenidoPagina' >
        {data.filter((item) => item.publicado)
        .map((item) => (
          <TarjetaClient key={item.idArticulo} objetoArticulo={item} />
        ))}
        </div>

        
    </MainAdmin>
   ) 
}

export default ArticuloCTView;