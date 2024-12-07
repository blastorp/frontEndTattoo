
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
      if (!publicado) {
         response = await fetchApiM1(
        ENDPOINTS.PUBLICARBENEFICIO, // Endpoint para actualizar
        "GET",null, {},
        { idBeneficio: objetoBeneficio.idBeneficio }
        
      );
      alert("Beneficio publicado");
      }
      else {
         response = await fetchApiM1(
          ENDPOINTS.DESPUBLICARBENEFICIO, // Endpoint para actualizar
          "GET", null, {},
          { idBeneficio: objetoBeneficio.idBeneficio }
        )
        alert("Beneficio despublicado");
      };
    //   Realiza la solicitud PUT
      

      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  const archivarBeneficio = async () => {
    try {
      const response = await fetchApiM1(
        ENDPOINTS.ARCHIVARBENEFICIO, // Endpoint para actualizar
        "GET",
        null,
        {},
        { idBeneficio: objetoBeneficio.idBeneficio }
      );
      console.log("Respuesta del servidor:", response);
      if ((response.message = "Beneficio archivado")) {
        
      }

      alert("Ficha Archivada");
      window.location.reload();
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  return (
    <div className="card-artista">
      
        {objetoBeneficio.archivado ? (
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
            <Link to={`/pages/BeneficioEdit/${objetoBeneficio.idBeneficio}`}>
              <EditIcon titleAccess="Editar"  sx={{color:"var(--oscuro-color)"}} />
            </Link>
          </div>
          <div className="contenedorVer">
            <Link to={`/pages/BeneficioDetails/${objetoBeneficio.idBeneficio}`}>
              <VisibilityIcon titleAccess="Vista Cliente" sx={{color:"var(--oscuro-color)"}}/>
            </Link>
          </div>

          {objetoBeneficio.archivado ? (
            <ArchiveIcon disabled />
          ) : (
            <div className="contenedorArchivar">
              <MuiDialog
                mensaje={"¿Está seguro de que desea archivar este Beneficio?"}
                textoBoton1={"Confirmar"}
                textoBoton2={"Cancelar"}
                textoBotonTrigger={<ArchiveIcon titleAccess="Archivar" sx={{color:"var(--rojo-color)"}}/>}
                onConfirm={archivarBeneficio}
              />
            </div>
          )}
        </div>
      </div>
      <div className="info">
        <h3>{objetoBeneficio.nombre}</h3>
        <p>Cantidad de Visitas: {objetoBeneficio.cantVisitas}</p>
      </div>
      <div className="toggle" key={objetoBeneficio.idBeneficio}>
        {/* <label htmlFor={`publicado-${objetoBeneficio.idBeneficio}`}>
          <input
            type="checkbox"
            id={`publicado-${objetoBeneficio.idBeneficio}`}
            checked={ publicado }
            onChange={togglePublicar} // Se ejecuta al cambiar
          />
          Publicado
        </label> */}
        <Switch 
        idIn = { `publicado-${objetoBeneficio.idBeneficio}` }
        checkedIN = { publicado }
        diasabledIN = { objetoBeneficio.archivado }
        onChangeIN = { togglePublicar }
        titulo = { "Publicado" }
        />
        <div className="contenedorInfo">
          <Link to={`/pages/BeneficioInfo/${objetoBeneficio.idBeneficio}`}>
          <InfoIcon titleAccess="Info Administrativa"  sx={{color:"var(--gris-color)"}}/>
          </Link>
          
         
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;