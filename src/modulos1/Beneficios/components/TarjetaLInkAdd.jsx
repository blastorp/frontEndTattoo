import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import '../estilos/Tarjeta.css'
function TarjetaLInkAdd() {
  return (
    <div className="card">
      <div className="profile-pic">
        <img src="https://via.placeholder.com/100" alt="Foto Referencia" />
        <Button variant="outlined"
        color="primary" 
        component={Link} 
        to="/pages/AddBeneficio"
        startIcon={<AddIcon/>}
        >
                      Nuevo Beneficio
            </Button>
      </div>
      <div className="info">
        <h3>Titulo Beneficio</h3>
        <p>Cantidad De Visitas</p>
      </div>
      <div className="toggle">
        <label for="publicado">
          <input disabled type="checkbox" id="publicado" />
          Publicado
        </label>
      </div>
    </div>
  );
}

export default TarjetaLInkAdd;
