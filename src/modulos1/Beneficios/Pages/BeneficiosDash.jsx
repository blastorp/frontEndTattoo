import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin2'
import TarjetaLinkAdd from '../components/TarjetaLInkAdd'

import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import Tarjeta from '../components/Tarjeta'
import '../estilos/BeneficiosDash.css'
import { useEffect, useRef, useState } from "react";


function BeneficiosDash() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await fetchApiM1(ENDPOINTS.GETBENEFICIOS);
        // setData(result)

        if (Array.isArray(result)) {
          setData(result);
          console.log(result);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        
      } catch (err) {
        setError(err.message);
        alert("error en useeffect " + error)
      }
    };

    fetchData();


  }, []);
  return (
    <MainAdmin tituloPagina={"Administracion Beneficios"}>
        
        <div className='contenedorContenidoPagina' >
        <TarjetaLinkAdd />
        {data.map((item) => (
          <Tarjeta key={item.idBeneficios} objetoBeneficio={item} />
        ))}
        </div>

        
        
    </MainAdmin>
   ) 
}

export default BeneficiosDash;