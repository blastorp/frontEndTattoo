
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

export const Tarjeta = ({ objetoCategoria }) => {
  const [image, setImage] = useState(null);
  const [indicadores, setIndicadores] = useState([])
  const [error, setError] = useState(null);
  const [publicado, setPublicado] = useState(objetoCategoria.publicado || false); // Inicializa con el valor actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        
          const resultIndicadores = await fetchApiM1(
            ENDPOINTS.INDICADORESCATEGORIA,
            "GET",
            null,
            {},
            { idCategoria: objetoCategoria.idCategoria }
          );
          if(resultIndicadores[0]) {
            setIndicadores(resultIndicadores[0]);
          }
          
          
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
  }, [objetoCategoria.idImagenArticulo]);

  const togglePublicar = async () => {
    try {
      const nuevoEstado = !publicado; // Invierte el estado actual
      setPublicado(nuevoEstado); // Actualiza el estado local
      let response;
      if (!publicado) {
         response = await fetchApiM1(
        ENDPOINTS.PUBLICARCATEGORIA, // Endpoint para actualizar
        "GET",null, {},
        { idCategoria: objetoCategoria.idCategoria }
        
      );
      alert("Categoria publicado");
      }
      else {
         response = await fetchApiM1(
          ENDPOINTS.DESPUBLICARCATEGORIA, // Endpoint para actualizar
          "GET", null, {},
          { idCategoria: objetoCategoria.idCategoria }
        )
        alert("Categoria despublicado");
      };
    //   Realiza la solicitud PUT
      

      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  const archivarCategoria = async () => {
    try {
      const response = await fetchApiM1(
        ENDPOINTS.ARCHIVARCATEGORIA, // Endpoint para actualizar
        "GET",
        null,
        {},
        { idCategoria: objetoCategoria.idCategoria }
      );
      console.log("Respuesta del servidor:", response);
      if ((response.message = "Categoria Archivada")) {
        alert("Ficha Archivada");
      }

      
      window.location.reload();
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  return (
    <div className="card-artista">
      
        {objetoCategoria.archivado ? (
        <div class="ribbon-wrapper-green">
          <div class="ribbon-green">ARCHIVADO</div>
        </div>
      ) : (
        ""
      )}

      <div className="profile-pic-artista">
        <img src={image} alt="Foto de Categoria" />
        
        <div className="contenedorBotonesAccion">
          <div className="contenedorEdit">
            <Link to={`/pages/CategoriaEdit/${objetoCategoria.idCategoria}`}>
              <EditIcon titleAccess="Editar"  sx={{color:"var(--oscuro-color)"}} />
            </Link>
          </div>
          <div className="contenedorVer">
            <Link to={`/pages/CategoriaDetails/${objetoCategoria.idCategoria}`}>
              <VisibilityIcon titleAccess="Vista Cliente" sx={{color:"var(--oscuro-color)"}}/>
            </Link>
          </div>

          {objetoCategoria.archivado ? (
            <ArchiveIcon disabled />
          ) : (
            <div className="contenedorArchivar">
              <MuiDialog
                mensaje={"¿Está seguro de que desea archivar esta Categoria?"}
                textoBoton1={"Confirmar"}
                textoBoton2={"Cancelar"}
                textoBotonTrigger={<ArchiveIcon titleAccess="Archivar" sx={{color:"var(--rojo-color)"}}/>}
                onConfirm={archivarCategoria}
              />
            </div>
          )}
        </div>
      </div>
      <div className="info">
        <h3>{objetoCategoria.nombre}</h3>
        <p>Artistas Expertos: <b style={{color: "orange"}}>{indicadores.cantidadArtistas? indicadores.cantidadArtistas : "0"}</b> </p>
        <p>Tattoos en Galeria: <b style={{color: "green"}}>{indicadores.cantidadTattosGaleria? indicadores.cantidadTattosGaleria : "0"}</b></p>
      </div>
      <div className="toggle" key={objetoCategoria.idCategoria}>
        {/* <label htmlFor={`publicado-${objetoCategoria.idCategoria}`}>
          <input
            type="checkbox"
            id={`publicado-${objetoCategoria.idCategoria}`}
            checked={ publicado }
            onChange={togglePublicar} // Se ejecuta al cambiar
          />
          Publicado
        </label> */}
        <Switch 
        idIn = { `publicado-${objetoCategoria.idCategoria}` }
        checkedIN = { publicado }
        diasabledIN = { objetoCategoria.archivado }
        onChangeIN = { togglePublicar }
        titulo = { "Publicado" }
        />
        <div className="contenedorInfo">
          <Link to={`/pages/CategoriaInfo/${objetoCategoria.idCategoria}`}>
          <InfoIcon titleAccess="Info Administrativa"  sx={{color:"var(--gris-color)"}}/>
          </Link>
          
         
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;