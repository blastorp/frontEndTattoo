
import React, { useState, useEffect } from "react";
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
// cambio
import P1WizardBeneficio from "../components/P1WizardBeneficio";
import '../estilos/wizard.css'
//interaccion con firebase
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../services/firebase/firebaseConn";
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom';



function WizardForm() {
  
    //const [page, setPage] = useState(0);
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

    const [artGuardado, setArtGuardado] = useState(null);
    const [image, setImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [urlImagen, setUrlImagen] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriasElegidas, setcategoriasElegidas] = useState([]);
    const [error, setError] = useState(null);
    //para navegar a otra pagina
    const navigate = useNavigate();
    
   
    const guardarBeneficio = async (idImagen) => {
      try {

        const objetoBeneficio = {
            idBeneficio: null,
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
        const result = await fetchApiM1(ENDPOINTS.GUARDARBENEFICIOS, "POST", objetoBeneficio);
    
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
    
        const result = await fetchApiM1(ENDPOINTS.GUARDARIMAGENARTICULO, "POST", objImagenArticulo);
    
        const idImagenArticulo = result[0].idImagenArticulo;
        //console.log("Guardar Imagen Response:", idImagenArticulo);
    
        // Crear un objeto actualizado y usarlo directamente
       
    
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
        } else {
          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
          //console.log("URL de imagen:", url);
    
          const idImagen = await guardarImagen(url);
          //console.log("ID de Imagen guardada:", idImagen);
          

          await guardarBeneficio(idImagen);
          alert("Datos Guardados Correctamente");
          navigate('/pages/BeneficiosDash');
        }
      } catch (err) {
        console.error("Error in guardarDatos:", err.message);
        setError(err.message);
        alert("Error in guardarDatos:", err.message);
      }
    };
    return (
      <div className="form">
        
        <div className="form-container-wizard">
          <div className="header-wizard">
            {/* <h2 className="tituloPaginaWizard">{FormTitles[page]}</h2> */}
            <h2 className="tituloPaginaWizard">Datos Beneficio</h2>
          </div>
          <div className="body"><P1WizardBeneficio formData={formData} setFormData={setFormData}
                                    imageUpload = { imageUpload }
                                    setImageUpload ={setImageUpload}
                                    image={image} 
                                     setImage={setImage}  />
                                 </div>
          {/* <div className="body">{PageDisplay()}</div> */}
          <div className="">
            {/* <button
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button> */}
            <button
              onClick={() => {
                guardarDatos();
              }}
            >
                Guardar
              {/* {page === FormTitles.length - 1 ? "Guardar y Volver" : "Next"} */}
            </button>
          </div>
        </div>
      </div>
    );
}

export default WizardForm