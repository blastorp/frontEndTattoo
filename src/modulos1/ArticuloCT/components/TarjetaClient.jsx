import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import "../../01EstilosCompartidos/Tarjeta.css";
import { Link } from "react-router-dom";

export const TarjetaClient = ({ objetoArticulo }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [publicado, setPublicado] = useState(objetoArticulo.publicado || false); // Inicializa con el valor actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoArticulo.idImagenArticulo) {
          console.log(objetoArticulo.idImagenArticulo);
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: objetoArticulo.idImagenArticulo }
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
  }, [objetoArticulo.idImagenArticulo]);

  const oneupFunc = async () => {
    try {
      const respuesta = await fetchApiM1(
        ENDPOINTS.ONEUPARTICULO,
        "GET",
        null,
        {},
        { idArticulo: objetoArticulo.idArticulo }
      );
      console.log("Se actualizó el artículo con éxito");
    } catch (error) {
      console.error("Error al actualizar el artículo: ", error);
    }
  };
  return (
    <div className="card-artista">
      <div className="profile-pic-artista-cliente ">
        <img src={image} alt="Foto de perfil" />
      </div>
      <div className="info">
        <h3>{objetoArticulo.tituloCorto}</h3>
        <div className="description">
            <p>{objetoArticulo.descripcionIntro}</p>
      </div>
       
      <Link
      className="link-style-none"
      to={`/pages/ArticuloCTDetails/${objetoArticulo.idArticulo}`}
      onClick={oneupFunc} // Vinculamos el evento onClick
    >
      Ver más...
    </Link>
      </div>
    </div>
  );
};

export default TarjetaClient;
