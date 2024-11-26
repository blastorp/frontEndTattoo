
import React, { useState, useEffect } from "react";
import fetchApiM1  from "../../../services/api/fetchApiM1";
import ENDPOINTS  from "../../../services/api/endpoints";
// cambio
import P1WizardArtista from "../components/P1WizardArtista";
import P2WizardArtista from "../components/P2WizardArtista";
import P3WizardArtista from "../components/P3WizardArtista";
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



function WizardForm() {
  
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        idArtista: null,
        nombre: "",
        nombreArt: "",
        nroIdentificacion: "",
        descripcionArt: "",
        idImagenFotoPerfil : null,
        telefono: "",
        email: "",
        fechaCreacion: null,
        estadoLogico: true,
        publicado: true,
        archivado: true
        
    });

    const [artGuardado, setArtGuardado] = useState(null)
    const [image, setImage] = useState(null)
    const [imageUpload, setImageUpload] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriasElegidas, setcategoriasElegidas] = useState([]);
    const [error, setError] = useState(null);
    
    const FormTitles = ["Datos Personales", "Datos Ficha Artista", "Categorias Artista"];
  
    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const result = await fetchApiM1(ENDPOINTS.GETCATEGORIAS);
          // setData(result)
  
          if (Array.isArray(result)) {
            setCategorias(result);
            
          } else {
            console.error("Unexpected data format:", result);
            setError("Unexpected data received from API."); // Provide a more informative error message
          }
          
        } catch (err) {
          setError(err.message);
          alert(error);
        }
      };
      fetchData();


  }, []);
    const PageDisplay = () => {
      if (page === 0) {
        return <P1WizardArtista formData={formData} setFormData={setFormData} />;
      } else if (page === 1) {
        return <P2WizardArtista formData={formData} setFormData={setFormData}
                                 setImageUpload ={setImageUpload}
                                 image={image} 
                                 setImage={setImage} />;
      } else {
        return <P3WizardArtista 
        formData={formData} setFormData={setFormData} 
        categorias= {categorias} categoriasElegidas ={ categoriasElegidas }
        setcategoriasElegidas={setcategoriasElegidas}/>;
      }
    };

    // const guardarArtista = () => {
    //   const fetchData = async () => {
        
    //     try {
    //       const result = await fetchApiM1(ENDPOINTS.GUARDARARTISTA, "POST", formData).then((result)=> 
    //         {
    //           const idartista = result.idArtista
    //           console.log(result.idArtista);
    //           console.log(result);

    //         guardarCategorias(idartista);
    //         setArtGuardado(result);
    //       }
            
    //       );
    //       // setData(result)
          
    //     } catch (err) {
    //       setError(err.message);
    //       alert(error);
    //     }
    //   };
    //   fetchData();
    // }

    // const guardarCategorias = (idArtista) => {
    //   const fetchData = async () => {
        
    //     try {
    //       const objCategorias = categoriasElegidas.map((idCategoria) => ({
    //         idArtista,
    //         idCategoria,
    //       }));
    //       console.log(objCategorias);
    //       const result = await fetchApiM1(ENDPOINTS.ASIGNARCATEGORIAS, "POST", objCategorias);
    //       // setData(result)
  
    //       if (result) {
    //         console.log(result)
    //         setArtGuardado(result);
            
    //       } else {
    //         console.error("Unexpected data format:", result);
    //         setError("Unexpected data received from API."); // Provide a more informative error message
    //       }
          
    //     } catch (err) {
    //       setError(err.message);
    //       alert(error);
    //     }
    //   };
    //   fetchData();
    // }
 

    const guardarArtista = async () => {
      try {
        // Call API and wait for the response
        const result = await fetchApiM1(ENDPOINTS.GUARDARARTISTA, "POST", formData);
    
        // Log the result for debugging
        console.log("Guardar Artista Response:", result);
    
        if (!result[0].idArtista) {
          throw new Error("idArtista is undefined in the API response");
        }
    
        // Set artist data and proceed to save categories
        setArtGuardado(result[0]);
        guardarCategorias(result[0].idArtista);
      } catch (err) {
        console.error("Error in guardarArtista:", err.message);
        setError(err.message);
        alert(err.message);
      }
    };
    
    const guardarCategorias = async (idArtista) => {
      try {
        // Map categories to objects with idArtista and idCategoria
        const objCategorias = categoriasElegidas.map((idCategoria) => ({
          idArtista,
          idCategoria,
        }));
    
        // Log the object to verify it is correct
        console.log("Categorías a guardar:", objCategorias);
    
        // Call API to save categories
        const result = await fetchApiM1(ENDPOINTS.ASIGNARCATEGORIAS, "POST", objCategorias);
    
        // Log the result for debugging
        console.log("Guardar Categorías Response:", result);
    
        setArtGuardado(result);
      } catch (err) {
        console.error("Error in guardarCategorias:", err.message);
        setError(err.message);
        alert(err.message);
      }
    };
    

    const guardarDatos = async () => {
      //subir imagen primero obtener url

      try {
        if (imageUpload == null) {
        setFormData( {...formData, urlImagen: null});
        guardarArtista();
      } else {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setFormData( {...formData, urlImagen: url});
          console.log(url);
          guardarArtista();
          console.log(artGuardado);
          
          //subir url a base de datos

      });
    });
      }
      
      }
      catch (err) {
        setError(err.message);
        alert(error);
      }
      

    }
  
    return (
      <div className="form">
        <div className="progressbar">
          <div
            style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
          ></div>
        </div>
        <div className="form-container">
          <div className="header">
            <h2 className="tituloPaginaWizard">{FormTitles[page]}</h2>
          </div>
          <div className="body">{PageDisplay()}</div>
          <div className="footer">
            <button
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
            <button
              onClick={() => {
                if (page === FormTitles.length - 1) {
                  guardarDatos();
                  
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
}

export default WizardForm
