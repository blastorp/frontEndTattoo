

import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import "../../01EstilosCompartidos/Tarjeta.css";
import { Link } from "react-router-dom";

const TarjetaClient = ({ objetoBeneficio }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoBeneficio.idImagenArticulo) {
          
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: objetoBeneficio.idImagenArticulo }
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
        <div className="tituloBeneficio">
        <h5>{objetoBeneficio.nombre}</h5>
            
        </div>
      <div className="profile-pic-beneficio-cliente">
        <img src={image} alt="Foto de Articulo" />
      </div>
      <div className="info">
        <p>{objetoBeneficio.subtitulo}</p>
       
       
        <Link className="link-style-none" to={`/pages/BeneficioDetails/${objetoBeneficio.idBeneficio}`}>
          Ver mas...
        </Link>
      </div>
    </div>
  );
};

export default TarjetaClient;
