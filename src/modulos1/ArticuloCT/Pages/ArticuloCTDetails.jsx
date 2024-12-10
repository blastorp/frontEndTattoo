import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/ArticuloCTDetails.css";
import { useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import BlogRenderer from "../components/BlogRenderer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../estilos/ArticuloCTDetails.css";

function ArticuloCTDetails() {
  const { idArticulo } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [elements, setElements] = useState([]);
  const [liked, setLiked] = useState(false); // Estado para el like
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const result = await fetchApiM1(
          ENDPOINTS.GETARTICULOXID,
          "GET",
          null,
          {},
          { idArticulo: idArticulo }
        );
        setData(result[0]);
        const hijos = await fetchApiM1(
          ENDPOINTS.LISTARELEMENTOSXIDARTICULO,
          "GET",
          null,
          {},
          { idArticulo: idArticulo }
        );
        setElements(hijos);
        fetchData2(result[0].idImagenArticulo);
      } catch (err) {
        setError(err.message);
        console.error("error en fetch ArtDetails: " + err.message);
      }
    };

    const fetchData2 = async (idImagen) => {
      try {
        if (idImagen) {
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: idImagen }
          );
          setImage(result[0].imagenUrl);
        } else {
          setImage("https://via.placeholder.com/100");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData1();
  }, [idArticulo]);

  const like = async () => {
    try {
      const respuesta = await fetchApiM1(
        ENDPOINTS.LIKEARTICULO,
        "GET",
        null,
        {},
        { idArticulo: idArticulo }
      );
      console.log("Se actualizó el artículo con éxito");
    } catch (error) {
      console.error("Error al actualizar el artículo: ", error);
    }
  };

  const dislike = async () => {
    try {
      const respuesta = await fetchApiM1(
        ENDPOINTS.DISLIKEARTICULO,
        "GET",
        null,
        {},
        { idArticulo: idArticulo }
      );
      console.log("Se actualizó el artículo con éxito");
    } catch (error) {
      console.error("Error al actualizar el artículo: ", error);
    }
  };

  // Función toggle para cambiar el estado de 'liked' y ejecutar la función correspondiente
  const toggleLike = async () => {
    if (liked) {
      await dislike(); // Si ya tiene like, quitar el dislike
    } else {
      await like(); // Si no tiene like, dar like
    }
    setLiked(!liked); // Cambiar el estado de 'liked'
  };

  return (
    <div>
      {/* Header Section */}
      <header>
        <button className="back-button-artDet" onClick={handleGoBack}>
          <ArrowBack size={24} /> {/* Back arrow icon */}
        </button>
        <h1>Cuidados del Tattoo y BLOG</h1>
      </header>

      <div className="titulo-principal">
        <h2
          style={{ textAlign: "center", margin: "20px 0", fontWeight: "bold" }}
        >
          {data.tituloPrincipal}
        </h2>
      </div>
      <div className="profile-pic-details">
        <img src={image} alt="Profile" />
      </div>

      <BlogRenderer elements={elements} />
      <div className="contenedor-like">
        <p>
          Te gusto este Articulo dejanos un Like para Generar mas Contenido de
          Calidad
        </p>{" "}
        <br />
        <FavoriteBorderIcon
          onClick={toggleLike}
          className="sticky-like-icon"
          fontSize="large"
          style={{ color: liked ? "red" : "gray" }}
        />
      </div>

      {/* Icono de Like */}

      <footer>
        <p>&copy; 2024 Temple of Ink</p>
      </footer>
    </div>
  );
}

export default ArticuloCTDetails;
