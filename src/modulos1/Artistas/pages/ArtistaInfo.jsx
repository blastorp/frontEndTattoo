import React from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/ArtistaDetails.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CheckboxButton from "../../../layouts/componentes/CheckBoxButton";

function ArtistaDetails() {
  const { artistaId } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const [categoriasElegidas, setcategoriasElegidas] = useState([]);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const result = await fetchApiM1(
          ENDPOINTS.GETARTISTAXID,
          "GET",
          null,
          {},
          { idArtista: artistaId }
        );

        // const resultCat = await fetchApiM1(ENDPOINTS.GETCATEGORIAS);

        //   setCategorias(resultCat);
        //   console.log("categorias " + categorias)

        const resultCatAsignadas = await fetchApiM1(
          ENDPOINTS.GETCATEGORIAXARTISTA,
          "GET",
          null,
          {},
          { idArtista: artistaId }
        );
        setcategoriasElegidas(resultCatAsignadas);

        console.log(categoriasElegidas);
        if (Array.isArray(result)) {
          setData(result[0]);
          fetchData2(result[0].idImagenFotoPerfil);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
      } catch (err) {
        setError(err.message);
      }
    };
    const fetchData2 = async (idImagen) => {
      try {
        if (idImagen) {
          console.log(idImagen);
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: idImagen }
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
    fetchData1();
  }, []);
  return (
    <div>
      {/* Header Section */}
      <header>
        <button className="back-button-artDet" onClick={handleGoBack}>
          <ArrowBack size={24} /> {/* Back arrow icon */}
        </button>
      </header>

      {/* Main Content */}
      <main>
        {/* Profile Picture */}
        <div className="profile-pic-details">
          <img src={image} alt="Profile" />
          <h2 className="nombreArt">{data.nombreArt}</h2>
        </div>

        {/* Description */}
        <section>
          <h2>Perfil de {data.nombreArt}</h2>
          <p>{data.descripcionArt}</p>
        </section>

        {/* Contact Info */}

        {/* Creation Date */}
        <section>
          <h3>
            Miembro del Templo desde{" "}
            {new Date(data.fechaCreacion).getFullYear()}
          </h3>
        </section>
        <section className="contenedorMinigaleria">
          <h3 >Categorias y Artes</h3>
          <div className="contenedorBotones">
          <CheckboxButton key="" idIn="nulo">Todas</CheckboxButton> 
            {categoriasElegidas.map((item) => (
            <CheckboxButton key={item.idCategoria} idIn={item.idCategoria}>{item.nombre}</CheckboxButton> 
          ))}
          </div>
          
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Temple of Ink</p>
      </footer>
    </div>
  );
}

export default ArtistaDetails;
