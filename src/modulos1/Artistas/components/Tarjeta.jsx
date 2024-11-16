import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';

export const Tarjeta = () => {
  return (
    <div className="card">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/100" alt="Foto de perfil" />
        </div>
        <div className="info">
          <h3>Nombre de Usuario</h3>
          <p>📞 Teléfono: +123 456 789</p>
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