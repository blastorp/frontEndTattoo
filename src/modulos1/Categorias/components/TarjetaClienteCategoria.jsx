import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import "../../01EstilosCompartidos/Tarjeta.css";
import { Link } from "react-router-dom";

const TarjetaClienteCategoria = ({ objetoCategoria }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoCategoria.idImagenArticulo) {
          
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: objetoCategoria.idImagenArticulo }
          );

          console.log(result[0]);
          setImage(result[0].imagenUrl);
        } else {
          setImage("https://via.placeholder.com/100");

        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card-artista">
        <div className="tituloCategoria">
        <h5>{objetoCategoria.nombre}</h5>
            
        </div>
      <div className="profile-pic-categoria-cliente">
        <img src={image} alt="Foto de Articulo" />
      </div>
      <div className="info">
        <p>{objetoCategoria.descripcionCategoria.slice(0,25)}...  &nbsp;
        <Link className="link-style-none" to={`/pages/CategoriaDetails/${objetoCategoria.idCategoria}`}>
            Ver mas...
        </Link>
        </p>
      </div>
    </div>
  );
};

export default TarjetaClienteCategoria;
