import React from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/BeneficioDetails.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function BeneficioDetails() {
  const { idBeneficio } = useParams();
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
          ENDPOINTS.GETBENEFICIOXID,
          "GET",
          null,
          {},
          { idBeneficio: idBeneficio }
        );
        setData(result[0]);
        fetchData2(result[0].idImagenArticulo);

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
          <h2 className="nombreArt">{data.nombre}</h2>
        </div>

        {/* Description */}
        <section>
          <h2>{data.subtitulo}</h2>
          <p>{data.descripcion}</p>
        </section>

        
        <section>
        <h2>Membresias Asociadas:</h2>
          {/* aqui iria la lista de membresias asociadas a este beneficio */}
        </section>
        
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Temple of Ink</p>
      </footer>
    </div>
  );
}

export default BeneficioDetails;
