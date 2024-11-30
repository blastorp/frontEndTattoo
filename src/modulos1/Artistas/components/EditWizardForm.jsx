import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
// cambio
import P1WizardArtista from "../components/P1WizardArtista";
import P2WizardArtista from "../components/P2WizardArtista";
import P3WizardArtista from "../components/P3WizardArtista";
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

//modificar api para llamar al objArtista y llenar los campos   #done
//mod funcion de guardado de imagen #done tiene un bug y no muestra la alerta falta probar el cambio de imagen
//mod p2 para mostrar imagen actual del artista # done
//buscar las categorias asignadas al artista y setCategoriasSeleccionadas # revisar 

//mod guardarDatos, art, cat, imagen etc  # haciendolo 
//borrar imagen anterior
//probar


function EditWizardForm( ) {
    const { idArt } = useParams();
  const [page, setPage] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagenInicial, setImagenInicial] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriasElegidas, setcategoriasElegidas] = useState([]);
  const [error, setError] = useState(null);
  //para navegar a otra pagina
  const navigate = useNavigate();
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

  const FormTitles = [
    "Datos Personales",
    "Datos Ficha Artista",
    "Categorias Artista",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        //busqueda de categorias
        const result = await fetchApiM1(ENDPOINTS.GETCATEGORIAS);
        if (Array.isArray(result)) {
          setCategorias(result);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        //busqueda de Artista con id
        const resultArt = await fetchApiM1(
          ENDPOINTS.GETARTISTAXID,
          "GET",
          null,
          {},
          { idArtista: idArt }
        );
        console.log(resultArt[0]);
        if (Array.isArray(resultArt)) {
          
          setFormData({
            idArtista: resultArt[0].idArtista,
            nombre: resultArt[0].nombre,
            nombreArt: resultArt[0].nombreArt,
            nroIdentificacion: resultArt[0].nroIdentificacion,
            descripcionArt: resultArt[0].descripcionArt,
            idImagenFotoPerfil: resultArt[0].idImagenFotoPerfil,
            telefono: resultArt[0].telefono,
            email: resultArt[0].email,
            fechaCreacion: null,
            estadoLogico: true,
            publicado: true,
            archivado: true,
          });

          if (resultArt[0].idImagenFotoPerfil) {
            
            const result = await fetchApiM1(
              ENDPOINTS.GETURLIXDIMAGEN,
              "GET",
              null,
              {},
              { idImagenArticulo: resultArt[0].idImagenFotoPerfil }
            );
  
            console.log(result[0]);
            setImage(result[0].imagenUrl);
            setImagenInicial(result[0].imagenUrl);
            setImageUpload(result[0].imagenUrl);
          } else {
            setImage("https://via.placeholder.com/100");
          }
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        //busqueda de Categorias asignadas al artista
        const resultCatAsignadas = await fetchApiM1(
            ENDPOINTS.GETCATEGORIAXARTISTA,
            "GET",
            null,
            {},
            { idArtista: idArt }
          );
          if (Array.isArray(resultCatAsignadas)) {
            //cambiar porque es un arreglo
            resultCatAsignadas.map( (item)  => {
                setcategoriasElegidas((prev) => [...prev, item.idCategoria])
            })
          } else {
            console.error("Unexpected data format:", result);
            setError("Unexpected data received from API."); // Provide a more informative error message
          }

      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };
    fetchData();
  }, []);


 

  const PageDisplay = () => {
    if (page === 0) {
      return <P1WizardArtista formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return (
        <P2WizardArtista
          formData={formData}
          setFormData={setFormData}
          setImageUpload={setImageUpload}
          image={image}
          setImage={setImage}
        />
      );
    } else {
      return (
        <P3WizardArtista
          formData={formData}
          setFormData={setFormData}
          categorias={categorias}
          categoriasElegidas={categoriasElegidas}
          setcategoriasElegidas={setcategoriasElegidas}
        />
      );
    }
  };

  const guardarArtista = async (idImagen) => {
    try {
      const objArtista = {
        idArtista: formData.idArtista,
        nombre: formData.nombre,
        nombreArt: formData.nombreArt,
        nroIdentificacion: formData.nroIdentificacion,
        descripcionArt: formData.descripcionArt,
        idImagenFotoPerfil: idImagen,
        telefono: formData.telefono,
        email: formData.email,
        fechaCreacion: null,
        estadoLogico: true,
        publicado: true,
        archivado: true,
      };

      // Call API and wait for the response
      const result = await fetchApiM1(
        ENDPOINTS.EDITARTISTA,
        "POST",
        objArtista
      );

      if (!result[0].idArtista) {
        throw new Error("idArtista is undefined in the API response");
      }

      // Set artist data and proceed to save categories
      
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
      ////console.log("Categorías a guardar:", objCategorias);

      // Call API to save categories
      const result = await fetchApiM1(
        ENDPOINTS.ASIGNARCATEGORIAS,
        "POST",
        objCategorias
      );

      // Log the result for debugging
      //console.log("Guardar Categorías Response:", result);

      
    } catch (err) {
      //console.error("Error in guardarCategorias:", err.message);
      setError(err.message);
      //alert("Error in guardarCategorias:", err.message);
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
        idImagenFotoPerfil: idImagenArticulo,
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
        guardarArtista(null);
    } else if(imageUpload == imagenInicial){
        await guardarArtista(formData.idImagenFotoPerfil);
        alert("Datos Guardados Correctamente");
        navigate("/pages/ArtistasDash");
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
        await guardarArtista(idImagen);
        alert("Datos Guardados Correctamente");
        navigate("/pages/ArtistasDash");
      }
    } catch (err) {
      console.error("Error in guardarDatos:", err.message);
      setError(err.message);
      alert("Error in guardarDatos:", err.message);
    }
  };
  return (
    <div className="form">
      <div className="form-container">
        <div className="header">
          <h2 className="tituloPaginaWizard">{FormTitles[page]}</h2>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer1" id="footerForm">
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
            {page === FormTitles.length - 1 ? "Guardar y Volver" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWizardForm;
