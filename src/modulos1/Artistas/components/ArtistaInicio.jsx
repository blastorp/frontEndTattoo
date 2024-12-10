import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import TarjetaClient from './TarjetaClient';
import '../estilos/ArtistaInicio.css'

function ArtistaInicio() {
    const [artistas, setArtistas] = useState([]);
    const [artistasRandom, setArtistasRandom] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchApiM1(ENDPOINTS.GETARTISTAS);
                if (Array.isArray(result)) {
                    setArtistas(result);
                    seleccionarArtistasAleatorios(result);
                } else {
                    setError("Unexpected data format.");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    // Función para seleccionar dos artistas aleatoriamente
    const seleccionarArtistasAleatorios = (listaArtistas) => {
        const filtrados = listaArtistas.filter((item) => item.publicado);
        const seleccionados = filtrados.sort(() => 0.5 - Math.random()).slice(0, 2);
        setArtistasRandom(seleccionados);
    };

    return (
        <section className="artistas-section">
            <h2 className="artistas-title">
                Conoce mejor a Nuestros Artistas y Sus Trabajos
            </h2>
            <h4 className='subtitulo-sec'>Artistas del Dia</h4>
            <div className="artista-container">
                {artistasRandom.length === 0 ? (
                    <p>Cargando Artistas...</p>
                ) : (
                    artistasRandom.map((item) => (
                        <TarjetaClient key={item.idArtista} objetoArtista={item} />
                    ))
                )}
            </div>
            <Link  to= {"/pages/ArtistasView"} className="buttonD">
            <span  className='boton-link'>Ver mas Artistas</span> {/* Título del botón */}
          </Link>

        </section>
    );
}

export default ArtistaInicio;
