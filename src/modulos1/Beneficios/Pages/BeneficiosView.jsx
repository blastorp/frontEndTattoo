import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin2';
import TarjetaClientBeneficio from '../components/TarjetaClientBeneficio';
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import '../estilos/BeneficiosView.css'
import { useEffect, useRef, useState } from "react";

function BeneficiosView() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await fetchApiM1(ENDPOINTS.GETBENEFICIOS);
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
    <MainAdmin tituloPagina={"Beneficios"}>
        
        <div className='contenedorContenidoPagina' >
        {data.filter((item) => item.publicado)
        .map((item) => (
          <TarjetaClientBeneficio key={item.idBeneficio} objetoBeneficio={item} />
        ))}
        </div>

        
    </MainAdmin>
   ) 
}

export default BeneficiosView;