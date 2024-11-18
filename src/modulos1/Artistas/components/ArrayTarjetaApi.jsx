import { useEffect, useRef, useState } from "react";
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
import Tarjeta from "./Tarjeta";

function ArrayTarjetaApi() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await fetchApiM1(ENDPOINTS.GETARTISTAS);
        setData(result)

        // if (Array.isArray(result)) {
        //   setData(result);
        // } else {
        //   console.error("Unexpected data format:", result);
        //   setError("Unexpected data received from API."); // Provide a more informative error message
        // }
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();

    // return () => {
    //   if (abortControllerRef.current) {
    //     abortControllerRef.current.abort();
    //   }
    // };
  }, []);
  console.log(error);
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {
      data.map((item) => {
        console.log(data);
        <Tarjeta  objetoArtista={ item } /> 
      }   
      )}
    </div> 
  );
}

export default ArrayTarjetaApi;