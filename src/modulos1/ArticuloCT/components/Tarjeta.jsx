
import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import "../../01EstilosCompartidos/Tarjeta.css";
import { Link, useNavigate } from "react-router-dom";
import MuiDialog from "../../../layouts/componentes/MuiDialog";
import Switch from "../../../layouts/componentes/Switch";

export const Tarjeta = ({ objetoArticulo }) => {
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

  const togglePublicar = async () => {
    try {
      const nuevoEstado = !publicado; // Invierte el estado actual
      setPublicado(nuevoEstado); // Actualiza el estado local
      let response;
      if (!publicado) {
         response = await fetchApiM1(
        ENDPOINTS.PUBLICARARTICULO, // Endpoint para actualizar
        "GET",null, {},
        { idArticulo: objetoArticulo.idArticulo }
        
      );
      alert("Articulo publicado");
      }
      else {
         response = await fetchApiM1(
          ENDPOINTS.DESPUBLICARARTICULO, // Endpoint para actualizar
          "GET", null, {},
          { idArticulo: objetoArticulo.idArticulo }
        )
        alert("Articulo despublicado");
      };
    //   Realiza la solicitud PUT
      

      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  const archivarArticulo = async () => {
    try {
      const response = await fetchApiM1(
        ENDPOINTS.ARCHIVARARTICULO, // Endpoint para actualizar
        "GET",
        null,
        {},
        { idArticulo: objetoArticulo.idArticulo }
      );
      console.log("Respuesta del servidor:", response);
      if ((response.message = "Articulo archivado")) {
        alert("Ficha Archivada");
      window.location.reload();
      }

      
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  return (
    <div className="card-artista">
      
        {objetoArticulo.archivado ? (
        <div class="ribbon-wrapper-green">
          <div class="ribbon-green">ARCHIVADO</div>
        </div>
      ) : (
        ""
      )}

      <div className="profile-pic-artista">
        <img src={image} alt="Foto de perfil" />
        
        <div className="contenedorBotonesAccion">
          <div className="contenedorEdit">
            <Link to={`/pages/ArticuloCTEdit/${objetoArticulo.idArticulo}`}>
              <EditIcon titleAccess="Editar"  sx={{color:"var(--oscuro-color)"}} />
            </Link>
          </div>
          <div className="contenedorVer">
            <Link to={`/pages/ArticuloCTDetails/${objetoArticulo.idArticulo}`}>
              <VisibilityIcon titleAccess="Vista Cliente" sx={{color:"var(--oscuro-color)"}}/>
            </Link>
          </div>

          {objetoArticulo.archivado ? (
            <ArchiveIcon disabled />
          ) : (
            <div className="contenedorArchivar">
              <MuiDialog
                mensaje={"¿Está seguro de que desea archivar este Articulo?"}
                textoBoton1={"Confirmar"}
                textoBoton2={"Cancelar"}
                textoBotonTrigger={<ArchiveIcon titleAccess="Archivar" sx={{color:"var(--rojo-color)"}}/>}
                onConfirm={archivarArticulo}
              />
            </div>
          )}
        </div>
      </div>
      <div className="info">
        <h3 >{objetoArticulo.tituloCorto} &nbsp;
            <InfoIcon titleAccess={objetoArticulo.tituloPrincipal}disable sx={{color:"var(--gris-color)"}}/>
        </h3>
        <p>Cantidad de Visitas: <b style={{color: "orange"}}> {objetoArticulo.cantVisitas}</b> </p>
        <p>Cantidad de Likes: <b style={{color: "green"}}>{objetoArticulo.likes}</b> </p>
      </div>
      <div className="toggle" key={objetoArticulo.idArticulo}>
       
        <Switch 
        idIn = { `publicado-${objetoArticulo.idArticulo}` }
        checkedIN = { publicado }
        diasabledIN = { objetoArticulo.archivado }
        onChangeIN = { togglePublicar }
        titulo = { "Publicado" }
        />
       
      </div>
    </div>
  );
};

export default Tarjeta;