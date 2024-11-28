import React from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import "../estilos/ArtistaDetails.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function ArtistaDetails() {
  const { artistaId } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchData = async () => {
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
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
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
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>

        {/* Description */}
        <section>
          <h2>About</h2>
          <p>{data.descripcionArt}</p>
        </section>

        {/* Contact Info */}
        <section>
          <h2>Contact</h2>
          <p>
            <strong>Phone:</strong> {data.telefono || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {data.email || "N/A"}
          </p>
        </section>

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
