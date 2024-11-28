
import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import "../estilos/Tarjeta.css";
import { Link } from "react-router-dom";

export const Tarjeta = ({ objetoBeneficio }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [publicado, setPublicado] = useState(objetoBeneficio.publicado || false); // Inicializa con el valor actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoBeneficio.idImagenArticulo) {
          console.log(objetoBeneficio.idImagenArticulo);
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
  }, [objetoBeneficio.idImagenArticulo]);

  const togglePublicar = async () => {
    try {
      const nuevoEstado = !publicado; // Invierte el estado actual
      setPublicado(nuevoEstado); // Actualiza el estado local
      let response;
      if (publicado) {
         response = await fetchApiM1(
        ENDPOINTS.PUBLICARARTISTA, // Endpoint para actualizar
        "GET",null, {},
        { idBeneficio: objetoBeneficio.idBeneficio }
        
      );
      alert("artista publicado");
      }
      else {
         response = await fetchApiM1(
          ENDPOINTS.DESPUBLICARARTISTA, // Endpoint para actualizar
          "GET", null, {},
          { idBeneficio: objetoBeneficio.idBeneficio }
        )
        alert("artista despublicado");
      };
      // Realiza la solicitud PUT
      

      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  return (
    <div className="card">
      <div className="profile-pic">
        <img src={image} alt="Foto de perfil" />
        <div className="contenedorBotonesAccion">
          <div className="contenedorEdit">
            <Link>
              <EditIcon />
            </Link>
          </div>
          <div className="contenedorVer">
            <Link>
              <VisibilityIcon />
            </Link>
          </div>
          <div className="contenedorArchivar">
            <Link>
              <ArchiveIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="info">
        <h3>{objetoBeneficio.nombre}</h3>
        <p> {objetoBeneficio.cantVisitas}</p>
      </div>
      <div className="toggle" key={objetoBeneficio.idBeneficio}>
        <label htmlFor={`publicado-${objetoBeneficio.idBeneficio}`}>
          <input
            type="checkbox"
            id={`publicado-${objetoBeneficio.idBeneficio}`}
            checked={publicado}
            onChange={togglePublicar} // Se ejecuta al cambiar
          />
          Publicado
        </label>
      </div>
    </div>
  );
};

export default Tarjeta;