
import React, { useState, useEffect } from "react";
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
// cambio
import P1WizardCategoria from "../components/P1WizardCategoria";
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
        idCategoria: null,
        idCategoriaPadre: null,
        nombre: "",
        descripcionCategoria: "",
        idImagenArticulo: null,
        estadoLogico: true,
        publicado: false,
        archivado: false
        
    });

    
    const [image, setImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [urlImagen, setUrlImagen] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriasElegidas, setcategoriasElegidas] = useState([]);
    const [error, setError] = useState(null);
    //para navegar a otra pagina
    const navigate = useNavigate();
    
 

    const guardarCategoria = async (idImagen) => {
      try {

        const objetoCategoria = {
            idCategoria: null,
        idCategoriaPadre: null,
        nombre: formData.nombre,
        descripcionCategoria: formData.descripcionCategoria,
        idImagenArticulo: idImagen,
        estadoLogico: true,
        publicado: false,
        archivado: false
        }
        
        const result = await fetchApiM1(ENDPOINTS.GUARDARCATEGORIA, "POST", objetoCategoria);
    
        // Log the result for debugging
        //console.log("Guardar Artista Response:", result);
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
          guardarCategoria(null);
        } else {
          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
          //console.log("URL de imagen:", url);
    
          const idImagen = await guardarImagen(url);
          //console.log("ID de Imagen guardada:", idImagen);
          

          await guardarCategoria(idImagen);
          
          navigate('/pages/CategoriasDash');
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
            <h2 className="tituloPaginaWizard">Datos Categoria</h2>
          </div>
          <div className="body"><P1WizardCategoria formData={formData} setFormData={setFormData}
                                    imageUpload = { imageUpload }
                                    setImageUpload ={setImageUpload}
                                    image={image} 
                                     setImage={setImage}  />
                                 </div>
          
          <div className="">
            
            <button
              onClick={() => {
                guardarDatos();
              }}
            >
                Guardar
              
            </button>
          </div>
        </div>
      </div>
    );
}

export default WizardForm
