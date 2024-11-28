
import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import "../estilos/Tarjeta.css";
import { Link } from "react-router-dom";

export const Tarjeta = ({ objetoArtista }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [publicado, setPublicado] = useState(objetoArtista.publicado || false); // Inicializa con el valor actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (objetoArtista.idImagenFotoPerfil) {
          console.log(objetoArtista.idImagenFotoPerfil);
          const result = await fetchApiM1(
            ENDPOINTS.GETURLIXDIMAGEN,
            "GET",
            null,
            {},
            { idImagenArticulo: objetoArtista.idImagenFotoPerfil }
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
    fetchData();
  }, [objetoArtista.idImagenFotoPerfil]);

  const togglePublicar = async () => {
    try {
      const nuevoEstado = !publicado; // Invierte el estado actual
      setPublicado(nuevoEstado); // Actualiza el estado local
      let response;
      if (publicado) {
         response = await fetchApiM1(
        ENDPOINTS.PUBLICARARTISTA, // Endpoint para actualizar
        "GET",null, {},
        { idArtista: objetoArtista.idArtista }
        
      );
      alert("artista publicado");
      }
      else {
         response = await fetchApiM1(
          ENDPOINTS.DESPUBLICARARTISTA, // Endpoint para actualizar
          "GET", null, {},
          { idArtista: objetoArtista.idArtista }
        )
        alert("artista despublicado");
      };
      // Realiza la solicitud PUT
      

      console.log("Respuesta del servidor:", response);
    } catch (err) {
      console.error("Error al actualizar el estado de publicación:", err);
    }
  };

  return (
    <div className="card">
      <div className="profile-pic">
        <img src={image} alt="Foto de perfil" />
        <div className="contenedorBotonesAccion">
          <div className="contenedorEdit">
            <Link>
              <EditIcon />
            </Link>
          </div>
          <div className="contenedorVer">
            <Link>
              <VisibilityIcon />
            </Link>
          </div>
          <div className="contenedorArchivar">
            <Link>
              <ArchiveIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="info">
        <h3>{objetoArtista.nombre}</h3>
        <p> 📞 {objetoArtista.telefono}</p>
      </div>
      <div className="toggle" key={objetoArtista.idArtista}>
        <label htmlFor={`publicado-${objetoArtista.idArtista}`}>
          <input
            type="checkbox"
            id={`publicado-${objetoArtista.idArtista}`}
            checked={publicado}
            onChange={togglePublicar} // Se ejecuta al cambiar
          />
          Publicado
        </label>
      </div>
    </div>
  );
};

export default Tarjeta;

// import React, { useState, useEffect } from "react";
// import fetchApiM1  from "../../../services/api/fetchApiM1";
// import ENDPOINTS  from "../../../services/api/endpoints";

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import EditIcon from '@mui/icons-material/Edit';
// import '../estilos/Tarjeta.css'
// import { Link } from 'react-router-dom';

// export const Tarjeta = ( {objetoArtista} ) => {
//   const [image, setImage] = useState(null)
//   const [error, setError] = useState(null);
//   const [publicado, setPublicado] = useState(objetoArtista.publicado);

//   useEffect(() => {
//     const fetchData = async () => {
      
//       try {

//         if (objetoArtista.idImagenFotoPerfil){
//           console.log(objetoArtista.idImagenFotoPerfil);
//         // const result = await fetchApiM1(ENDPOINTS.GETURLIXDIMAGEN, "GET", objetoArtista.idImagenFotoPerfil);
//         const result = await fetchApiM1(ENDPOINTS.GETURLIXDIMAGEN, "GET", null, {}, { idImagenArticulo: objetoArtista.idImagenFotoPerfil });

//         // setData(result)
//       console.log(result[0]);
//         setImage(result[0]. imagenUrl);
//         } else {setImage("https://via.placeholder.com/100");
//         }
        
//       } catch (err) {
//         setError(err.message);
//         // alert(error);
//         console.log(error);
//       }
//     };
//     fetchData();

// }, []);

// const togglePublicar = async () => {
//   try {
//     const nuevoEstado = !publicado; // Invierte el estado actual
//     setPublicado(nuevoEstado); // Actualiza el estado local

//     // Realiza la solicitud PUT
//     const response = await fetchApiM1(
//       ENDPOINTS.UPDATEPUBLICAR, // Endpoint para actualizar
//       "PUT",
//       null,
//       { idArtista: objetoArtista.idArtista }, // Parámetros en el body
//       { publicado: nuevoEstado } // Parámetros en los headers
//     );

//     console.log("Respuesta del servidor:", response);
//   } catch (err) {
//     console.error("Error al actualizar el estado de publicación:", err);
//   }
// };


//   return (
//     <div className="card">
//         <div className="profile-pic">
//           <img src={ image } alt="Foto de perfil" />
//           <div className="contenedorBotonesAccion">
//             <div className="contenedorEdit">
//                 <Link >
//                 <EditIcon/>
//                 </Link>
//             </div>
//             <div className="contenedorVer">
//             <Link>
//             <VisibilityIcon/>
//             </Link>
//             </div>
//             <div className="contenedorArchivar">
//             <Link>
//             <ArchiveIcon/>
//             </Link>
//             </div>
//            </div>
//         </div>
//         <div className="info">
//           <h3>{ objetoArtista.nombre }</h3>
//           <p> 📞 { objetoArtista.telefono }</p>
//         </div>
//         <div className="toggle" key={ objetoArtista.idArtista }>
//           <label for="publicado">
//             <input type="checkbox" id={ objetoArtista.idArtista } />
//             Publicado
//           </label>
//         </div>
//       </div>
//   )
// }
// export default Tarjeta;