import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin2';
import TarjetaClientCategoria from '../components/TarjetaClienteCategoria';
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import '../estilos/CategoriasView.css'
import { useEffect, useRef, useState } from "react";

function CategoriasView() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await fetchApiM1(ENDPOINTS.GETCATEGORIAS);
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
    <MainAdmin tituloPagina={"Categorias"}>
        
        <div className='contenedorContenidoPagina' >
        {data.filter((item) => item.publicado)
        .map((item) => (
          <TarjetaClientCategoria key={item.idCategoria} objetoCategoria={item} />
        ))}
        </div>

        
    </MainAdmin>
   ) 
}

export default CategoriasView;
