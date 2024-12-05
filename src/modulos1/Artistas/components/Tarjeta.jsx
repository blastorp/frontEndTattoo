import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import "../estilos/Tarjeta.css";
import { Link, useNavigate } from "react-router-dom";
import MuiDialog from "../../../layouts/componentes/MuiDialog";
import Switch from "../../../layouts/componentes/Switch";

export const Tarjeta = ({ objetoArtista }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [publicado, setPublicado] = useState(objetoArtista.publicado || false); // Inicializa con el valor actual
  const [archivado, setArchivado] = useState(objetoArtista.archivado || false); // Inicializa con el valor actual
  const navigate = useNavigate();

  const handleArchiveConfirm = () => {
    navigate(`/pages/ArtistasDash/`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoArtista.idImagenFotoPerfil) {
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

  const togglePublicar = async () => {
    try {
      const nuevoEstado = !publicado; // Invierte el estado actual
      setPublicado(nuevoEstado); // Actualiza el estado local
      let response;
      if (!publicado) {
        response = await fetchApiM1(
          ENDPOINTS.PUBLICARARTISTA, // Endpoint para actualizar
          "GET",
          null,
          {},
          { idArtista: objetoArtista.idArtista }
        );
        alert("artista publicado");
      } else {
        response = await fetchApiM1(
          ENDPOINTS.DESPUBLICARARTISTA, // Endpoint para actualizar
          "GET",
          null,
          {},
          { idArtista: objetoArtista.idArtista }
        );
        alert("artista despublicado");
      }
      // Realiza la solicitud PUT

      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };
  const archivarArtista = async () => {
    try {
      const response = await fetchApiM1(
        ENDPOINTS.ARCHIVARARTISTA, // Endpoint para actualizar
        "GET",
        null,
        {},
        { idArtista: objetoArtista.idArtista }
      );
      console.log("Respuesta del servidor:", response);
      if ((response.message = "Artista Archivado")) {
        setArchivado(true);
      }

      alert("Ficha Archivada");
      window.location.reload();
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  return (
    <div className="card">
      {objetoArtista.archivado ? (
        <div class="ribbon-wrapper-green">
          <div class="ribbon-green">ARCHIVADO</div>
        </div>
      ) : (
        ""
      )}

      <div className="profile-pic-artista">
        <div className="imageCont">
          <img src={image} alt="Foto de perfil" />
        </div>

        <div className="contenedorBotonesAccion">
          <div className="contenedorEdit">
            <Link to={`/pages/ArtistaEditArtista/${objetoArtista.idArtista}`}>
              <EditIcon sx={{color:"var(--oscuro-color)"}} />
            </Link>
          </div>
          <div className="contenedorVer">
            <Link>
              <VisibilityIcon  sx={{color:"var(--oscuro-color)"}}/>
            </Link>
          </div>

          {objetoArtista.archivado ? (
            <ArchiveIcon disabled />
          ) : (
            <div className="contenedorArchivar">
              <MuiDialog
                mensaje={"¿Está seguro de que desea archivar este artista?"}
                textoBoton1={"Confirmar"}
                textoBoton2={"Cancelar"}
                textoBotonTrigger={<ArchiveIcon sx={{color:"var(--rojo-color)"}}/>}
                onConfirm={archivarArtista}
              />
            </div>
          )}
        </div>
      </div>
      <div className="info">
        <h3>{objetoArtista.nombre}</h3>
        <p> 📞 {objetoArtista.telefono}</p>
      </div>
      <div className="toggle" key={objetoArtista.idArtista}>
        {/* <div className="contedorCheckPublicado">
        <label htmlFor={`publicado-${objetoArtista.idArtista}`}>
          <input
            type="checkbox"
            id={`publicado-${objetoArtista.idArtista}`}
            checked={publicado}
            disabled={objetoArtista.archivado}
            onChange={togglePublicar} // Se ejecuta al cambiar
          />
          Publicado
        </label>
        </div> */}
        <Switch 
        idIn = { `publicado-${objetoArtista.idArtista}` }
        checkedIN = { publicado }
        diasabledIN = { objetoArtista.archivado }
        onChangeIN = { togglePublicar }
        titulo = { "Publicado" }
        />
        <div className="contenedorInfo">
          <Link to={`/pages/ArtistaInfo/${objetoArtista.idArtista}`}>
          <InfoIcon  sx={{color:"var(--gris-color)"}}/>
          </Link>
          
         
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;
