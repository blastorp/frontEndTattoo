import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import P1WizardBeneficio from "../components/P1WizardBeneficio";
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



function WizardEditBeneficio( ) {
    const { idBeneficio } = useParams();
 
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagenInicial, setImagenInicial] = useState(null);
  
  
  const [error, setError] = useState(null);
  //para navegar a otra pagina
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idBeneficio: null,
    nombre: "",
    subtitulo: "",
    descripcion: "",
    idImagenArticulo: null,
    cantVisitas: null,
    estadoLogico: true,
    publicado: true,
    archivado: false
    
});

 
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const resultBeneficio = await fetchApiM1(
          ENDPOINTS.GETBENEFICIOXID,
          "GET",
          null,
          {},
          { idBeneficio: idBeneficio }
        );
        console.log(resultBeneficio[0]);
        if (Array.isArray(resultBeneficio)) {
          
          setFormData({
            idBeneficio: resultBeneficio[0].idBeneficio,
            nombre: resultBeneficio[0].nombre,
            subtitulo: resultBeneficio[0].subtitulo,
            descripcion: resultBeneficio[0].descripcion,
            idImagenArticulo: resultBeneficio[0].idImagenArticulo,
            cantVisitas: resultBeneficio[0].cantVisitas,
            estadoLogico: resultBeneficio[0].estadoLogico,
            publicado: resultBeneficio[0].publicado,
            archivado: resultBeneficio[0].archivado
          });

          if (resultBeneficio[0].idImagenArticulo) {
            
            const result = await fetchApiM1(
              ENDPOINTS.GETURLIXDIMAGEN,
              "GET",
              null,
              {},
              { idImagenArticulo: resultBeneficio[0].idImagenArticulo }
            );
  
            console.log(result[0]);
            setImage(result[0].imagenUrl);
            setImagenInicial(result[0].imagenUrl);
            setImageUpload(result[0].imagenUrl);
          } else {
            setImage("https://via.placeholder.com/100");
          }
        } else {
          console.error("Unexpected data format:", resultBeneficio[0]);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        

      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };
    fetchData();
  }, []);


  const guardarBeneficio = async (idImagen) => {
    try {

      const objetoBeneficio = {
          idBeneficio: formData.idBeneficio,
          nombre: formData.nombre,
          subtitulo: formData.subtitulo,
          descripcion: formData.descripcion,
          idImagenArticulo: idImagen,
          cantVisitas: 0,
          estadoLogico: true,
          publicado: true,
          archivado: false
      }
      //console.log("objcreagdo: "+ objArtista);
      //console.log(formData);
      // Call API and wait for the response
      const result = await fetchApiM1(ENDPOINTS.EDITARBENEFICIO , "POST", objetoBeneficio);
  
      // Log the result for debugging
      //console.log("Guardar Artista Response:", result);
  
      if (!result[0].idBeneficio) {
        throw new Error("idBeneficio is undefined in the API response");
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
        guardarBeneficio(null);
    } else if(imageUpload == imagenInicial){
        await guardarBeneficio(formData.idImagenArticulo);
        alert("Datos Guardados Correctamente");
        navigate("/pages/BeneficiosDash");
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
        await guardarBeneficio(idImagen);
        alert("Datos Guardados Correctamente");
        navigate("/pages/BeneficiosDash");
      }
    } catch (err) {
      console.error("Error in guardarDatos:", err.message);
      setError(err.message);
      alert("Error in guardarDatos:", err.message);
    }
  };
  return (
    <div className="form">
      {formData.idBeneficio === null ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="form-container-wizard">
          <div className="header-wizard">
            <h2 className="tituloPaginaWizard">Datos Beneficio</h2>
          </div>
          <div className="body">
            <P1WizardBeneficio 
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

export default WizardEditBeneficio;
