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
        <img src="https://via.placeholder.com/100" alt="Foto Referencia" />
        
        <Button variant="outlined"
        color="primary" 
        component={Link} 
        to="/pages/AddArticuloCT"
        startIcon={<AddIcon/>}
        >
          Articulo
            </Button>
      </div>
      <div className="info">
        <h3>Titulo Articulo</h3>
        <p>Cantidad De Visitas</p>
        <p>Cantidad De Likes</p>
      </div>
      <div className="toggle">
      <Switch 
        
        titulo = { "Publicado" }
        />
        {/* <div className="contenedorInfo">
          <InfoIcon titleAccess="Info Administrativa" disable sx={{color:"var(--gris-color)"}}/>
         
        </div> */}
      </div>
    </div>
  );
}

export default TarjetaLInkAdd;
