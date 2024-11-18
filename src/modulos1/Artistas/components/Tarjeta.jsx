import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import '../estilos/Tarjeta.css'
import { Link } from 'react-router-dom';
export const Tarjeta = ( {objetoArtista} ) => {
  return (
    <div className="card">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/100" alt="Foto de perfil" />
          <div className="contenedorBotonesAccion">
            <div className="contenedorEdit">
                <Link >
                <EditIcon/>
                </Link>
            </div>
            <div className="contenedorVer">
            <Link>
            <VisibilityIcon/>
            </Link>
            </div>
            <div className="contenedorArchivar">
            <Link>
            <ArchiveIcon/>
            </Link>
            </div>
           </div>
        </div>
        <div className="info">
          <h3>{objetoArtista.nombre}</h3>
          <p>{objetoArtista.telefono}</p>
        </div>
        <div className="toggle">
          <label for="publicado">
            <input type="checkbox" id="publicado" />
            Publicado
          </label>
        </div>
      </div>
  )
}
export default Tarjeta;