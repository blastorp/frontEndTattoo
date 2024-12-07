import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from "@mui/icons-material/Info";
import "../../01EstilosCompartidos/Tarjeta.css";
import Switch from "../../../layouts/componentes/Switch"
function TarjetaLInkAdd() {
  return (
    <div className="card-artista">
      <div className="profile-pic-artista">
        <img src="https://via.placeholder.com/100" alt="Foto de perfil" />
        <Button variant="outlined"
        color="primary" 
        component={Link} 
        to="/pages/AddArtista"
        startIcon={<AddIcon/>}
        >
            Nuevo Perfil
            
            </Button>
      </div>
      <div className="info">
        <h3>Nombre de Artista</h3>
        <p>📞 Contacto</p>
      </div>
      <div className="toggle">
        {/* <label for="publicado">
          <input disabled type="checkbox" id="publicado" />
          Publicado
        </label> */}
        <Switch 
        
        titulo = { "Publicado" }
        />
        <div className="contenedorInfo">
          <InfoIcon titleAccess="Info Administrativa" disable sx={{color:"var(--gris-color)"}}/>
         
        </div>
      </div>
    </div>
  );
}

export default TarjetaLInkAdd;
