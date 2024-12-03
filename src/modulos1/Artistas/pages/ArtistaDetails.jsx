import React from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/ArtistaDetails.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function ArtistaDetails( ) {
  const { artistaId } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
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
        if (Array.isArray(result)) {
          setData(result[0]);
          fetchData2(result[0].idImagenFotoPerfil)
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
      } catch (err) {
        setError(err.message);
      }
    };


    const fetchData2 = async ( idImageh ) => {
      try {
        if (idImageh) {
          console.log(idImageh);
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: idImageh }
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

    fetchData2();
  }, []);
  return (
    <div>
      {/* Header Section */}
      <header>
        <button className="back-button" onClick={handleGoBack}>
          <ArrowBack size={24} /> {/* Back arrow icon */}
        </button>
        <h1>{data.nombreArt}</h1>
        <p>Artista: {data.nombre}</p>
      </header>

      {/* Main Content */}
      <main>
        {/* Profile Picture */}
        <div className="profile-pic">
          <img src= { image } alt="Profile" />
        </div>

        {/* Description */}
        <section>
          <h2>About</h2>
          <p>{data.descripcionArt}</p>
        </section>

        {/* Contact Info */}
       

        {/* Creation Date */}
        <section>
          <h2>Joined</h2>
          <p>{new Date(data.fechaCreacion).toLocaleDateString()}</p>
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
