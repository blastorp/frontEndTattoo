import React from "react";
import '../estilos/membresiaadd.css';
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";

const MembresiaADMINAdd = () => {

return (
    <div className="form-container">
      <h1 className="form-title">Nueva membresia</h1>
      <div className="form-content">
        <form className="formulario">
          <input type="text" placeholder="Texto" className="input" />
          <select className="select">
            <option value="">Seleccione una opción</option>
          </select>
          <input type="email" placeholder="Correo" className="input" />
          <input type="date" className="date" />
          <input type="password" placeholder="Contraseña" className="input" />
          <select className="select">
            <option value="">Otra selección</option>
          </select>
          <label className="checkbox-container">
            <input type="checkbox" />
            Acepto los términos
          </label>
          <button type="submit" className="button">Enviar</button>
        </form>
        <div className="image-container">
          <img src="ruta/a/imagen.jpg" alt="Imagen" className="form-image" />
        </div>
      </div>
    </div>
  );
};


export default MembresiaADMINAdd;