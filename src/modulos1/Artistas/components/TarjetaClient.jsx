import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import "../estilos/TarjetaClient.css";
import { Link } from "react-router-dom";

export const TarjetaClient = ({ objetoArtista }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [publicado, setPublicado] = useState(objetoArtista.publicado || false); // Inicializa con el valor actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoArtista.idImagenFotoPerfil) {
          console.log(objetoArtista.idImagenFotoPerfil);
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: objetoArtista.idImagenFotoPerfil }
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
  }, [objetoArtista.idImagenFotoPerfil]);

  return (
    <div className="card">
      <div className="profile-pic">
        <img src={image} alt="Foto de perfil" />
      </div>
      <div className="info">
        <h3>{objetoArtista.nombreArt}</h3>
        <div className="description">
        
      </div>
       
        <Link className="link-style-none" to={`/pages/ArtistaDetails/${objetoArtista.idArtista}`}>
          Ver mas...
        </Link>
      </div>
    </div>
  );
};

export default TarjetaClient;
