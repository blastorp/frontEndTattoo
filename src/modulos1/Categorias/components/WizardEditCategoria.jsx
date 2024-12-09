import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import P1WizardCategoria from "../components/P1WizardCategoria";
// cambio

import "../estilos/wizard.css";
//interaccion con firebase
import {
  ref,
  uploadBytes,
  getDownloadURL,  
  listAll,
  list, 
  deleteObject
} from "firebase/storage";
import { storage } from "../../../services/firebase/firebaseConn";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

//todo



function WizardEditCategoria( ) {
    const { idCategoria } = useParams();
 
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagenInicial, setImagenInicial] = useState(null);
  
  
  const [error, setError] = useState(null);
  //para navegar a otra pagina
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idCategoria: null,
        idCategoriaPadre: null,
        nombre: "",
        descripcionCategoria: "",
        idImagenArticulo: null,
        estadoLogico: true,
        publicado: false,
        archivado: false
    
});

 
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const resultCategoria = await fetchApiM1(
          ENDPOINTS.GETCATEGORIAXID,
          "GET",
          null,
          {},
          { idCategoria: idCategoria }
        );
        console.log(resultCategoria[0]);
        if (Array.isArray(resultCategoria)) {
          
          setFormData({
            idCategoria: resultCategoria[0].idCategoria,
            idCategoriaPadre: resultCategoria[0].idCategoriaPadre,
            nombre: resultCategoria[0].nombre,
            descripcionCategoria: resultCategoria[0].descripcionCategoria,
            idImagenArticulo: resultCategoria[0].idImagenArticulo,
            estadoLogico: resultCategoria[0].estadoLogico,
            publicado: resultCategoria[0].publicado,
            archivado: resultCategoria[0].archivado
          });

          if (resultCategoria[0].idImagenArticulo) {
            
            const result = await fetchApiM1(
              ENDPOINTS.GETURLIXDIMAGEN,
              "GET",
              null,
              {},
              { idImagenArticulo: resultCategoria[0].idImagenArticulo }
            );
  
            console.log(result[0]);
            setImage(result[0].imagenUrl);
            setImagenInicial(result[0].imagenUrl);
            setImageUpload(result[0].imagenUrl);
          } else {
            setImage("https://via.placeholder.com/100");
          }
        } else {
          console.error("Unexpected data format:", resultCategoria[0]);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        

      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };
    fetchData();
  }, []);


  const guardarCategoria = async (idImagen) => {
    try {

      const objetoCategoria = {
        idCategoria: formData.idCategoria,
        idCategoriaPadre: formData.idCategoriaPadre,
        nombre: formData.nombre,
        descripcionCategoria: formData.descripcionCategoria,
        idImagenArticulo: idImagen,
        estadoLogico: true,
        publicado: false,
        archivado: false
      }
      
      const result = await fetchApiM1(ENDPOINTS.EDITCATEGORIA , "POST", objetoCategoria);
      alert("Datos Guardados Correctamente");
      
  
      if (!result[0].idCategoria) {
        throw new Error("idCategoria is undefined in the API response");
      }
  
      // Set artist data and proceed to save categories
    } catch (err) {
      console.error("Error in guardarArtista:", err.message);
      setError(err.message);
      alert(err.message);
    }
  };
  

  const guardarImagen = async (urlImagen) => {
    try {
      const objImagenArticulo = {
        idImagenArticulo: null,
        imagen: null,
        imagenUrl: urlImagen,
        descripcionCorta: null,
      };

      //console.log("Imagen a guardar:", objImagenArticulo);

      const result = await fetchApiM1(
        ENDPOINTS.GUARDARIMAGENARTICULO,
        "POST",
        objImagenArticulo
      );

      const idImagenArticulo = result[0].idImagenArticulo;
      //console.log("Guardar Imagen Response:", idImagenArticulo);

      // Crear un objeto actualizado y usarlo directamente
      const updatedFormData = {
        ...formData,
        idImagenArticulo: idImagenArticulo,
      };
      setFormData(updatedFormData);

      return idImagenArticulo;
    } catch (err) {
      console.error("Error en guardarImagen:", err.message);
      setError(err.message);
      alert(err.message);
    }
  };

  const guardarDatos = async () => {
    try {
      if (imageUpload == null) {
        guardarCategoria(null);
    } else if(imageUpload == imagenInicial){
        await guardarCategoria(formData.idImagenArticulo);
        alert("Datos Guardados Correctamente");
        navigate("/pages/CategoriasDash");
    } 
      else {
        //borrar la imagen anterior
        if (imagenInicial) {
          const previousImageRef = ref(storage, imagenInicial); // imagenInicial debe ser la URL o el path relativo de la imagen
          try {
            await deleteObject(previousImageRef);
            console.log("Imagen anterior eliminada correctamente.");
          } catch (deleteError) {
            console.error("Error al borrar la imagen anterior:", deleteError.message);
          }
        }

        //guardado de imagen en servidor firebase
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        //console.log("URL de imagen:", url);
        const idImagen = await guardarImagen(url);
        //console.log("ID de Imagen guardada:", idImagen);
        await guardarCategoria(idImagen);
        
        navigate("/pages/CategoriasDash");
      }
    } catch (err) {
      console.error("Error in guardarDatos:", err.message);
      setError(err.message);
      alert("Error in guardarDatos:", err.message);
    }
  };
  return (
    <div className="form">
      {formData.idCategoria === null ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="form-container-wizard">
          <div className="header-wizard">
            <h2 className="tituloPaginaWizard">Datos Categoria</h2>
          </div>
          <div className="body">
            <P1WizardCategoria 
              formData={formData} 
              setFormData={setFormData}
              imageUpload={imageUpload}
              setImageUpload={setImageUpload}
              image={image}
              setImage={setImage} 
            />
          </div>
          <div>
            <button onClick={guardarDatos}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default WizardEditCategoria;
