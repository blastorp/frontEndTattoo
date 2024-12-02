import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
// cambio
import P1WizardArtista from "../components/P1WizardArtista";
import P2WizardArtista from "../components/P2WizardArtista";
import P3WizardArtista from "../components/P3WizardArtista";
//import '../estilos/wizard.css'
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
import { useNavigate } from "react-router-dom";
import MuiDialog from "../../../layouts/componentes/MuiDialog";

function WizardForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    idArtista: null,
    nombre: "",
    nombreArt: "",
    nroIdentificacion: "",
    descripcionArt: "",
    idImagenFotoPerfil: null,
    telefono: "",
    email: "",
    fechaCreacion: null,
    estadoLogico: true,
    publicado: true,
    archivado: true,
  });

  const [confirmado, setConfirmado] = useState(false);
  const [artGuardado, setArtGuardado] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [urlImagen, setUrlImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriasElegidas, setcategoriasElegidas] = useState([]);
  const [error, setError] = useState(null);
  //para navegar a otra pagina
  const navigate = useNavigate();

  const FormTitles = [
    "Datos Personales",
    "Datos Ficha Artista",
    "Categorias Artista",
  ];

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
        idArtista: null,
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
      //console.log("objcreagdo: "+ objArtista);
      //console.log(formData);
      // Call API and wait for the response
      const result = await fetchApiM1(
        ENDPOINTS.GUARDARARTISTA,
        "POST",
        objArtista
      );

      // Log the result for debugging
      //console.log("Guardar Artista Response:", result);

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
      ////console.log("Categorías a guardar:", objCategorias);

      // Call API to save categories
      const result = await fetchApiM1(
        ENDPOINTS.ASIGNARCATEGORIAS,
        "POST",
        objCategorias
      );

      // Log the result for debugging
      //console.log("Guardar Categorías Response:", result);

      setArtGuardado(result);
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
      if (confirmado) {
        if (imageUpload == null) {
          guardarArtista(null);
        } else {
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
          {page === FormTitles.length - 1 ? (
            <button>
              <MuiDialog
                mensaje={
                  "Esta Seguro que quiere Guardar la informacion Suministrada"
                }
                textoBoton1={"Confirmar"}
                textoBoton2={"Cancelar"}
                textoBotonTrigger={"Guardar y Volver"}
                onConfirm={guardarDatos}
              />
            </button>
          ) : (
            <button onClick={() => setPage((currPage) => currPage + 1)}>
              Next
            </button>
          )}

          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          {/* <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                guardarDatos();
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Guardar y Volver" : "Next"}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default WizardForm;
