import React, { useState, useEffect } from "react";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
// cambio
import P1WizardArticuloCT from "../components/P1WizardArticuloCT";
import "../estilos/wizard.css";
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
import BlogEditor from "./BlogEditor";

function WizardForm() {
  //const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    idArticuloCT: null,
    tituloPrincipal: "",
    tituloCorto: "",
    descripcionIntro: "",
    idImagenArticulo: null,
    cantVisitas: 0,
    likes: 0,
    estadoLogico: true,
    publicado: false,
    archivado: false,
  });

  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [elements, setElements] = useState([]);
  const [error, setError] = useState(null);
  //para navegar a otra pagina
  const navigate = useNavigate();

  const guardarArticuloCT = async (idImagen) => {
    try {
      const objetoArticuloCT = {
        idArticuloCT: null,
        tituloPrincipal: formData.tituloPrincipal,
        tituloCorto: formData.tituloCorto,
        descripcionIntro: formData.descripcionIntro,
        idImagenArticulo: idImagen,
        cantVisitas: 0,
        likes: 0,
        estadoLogico: true,
        publicado: false,
        archivado: false,
      };

      const result = await fetchApiM1(
        ENDPOINTS.GUARDARARTICULO,
        "POST",
        objetoArticuloCT
      );

      if (!result[0].idArticulo) {
        throw new Error("idArticuloCT is undefined in the API response");
      }
      return result[0].idArticulo;
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
      const result = await fetchApiM1(
        ENDPOINTS.GUARDARIMAGENARTICULO,
        "POST",
        objImagenArticulo
      );

      const idImagenArticulo = result[0].idImagenArticulo;
      return idImagenArticulo;
    } catch (err) {
      console.error("Error en guardarImagen:", err.message);
      setError(err.message);
      alert(err.message);
    }
  };

  const subirImagenesElementos = async (idArticulo) => {
    try {
      const updatedElements = [...elements];

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        updatedElements[i].idArticulo = idArticulo;
        if (
          element.tipo === "imagen" &&
          element.contenido.startsWith("blob:")
        ) {
          try {
            const fileName = `images/articulos/idArt_${idArticulo}_${Date.now()}_${i}.jpg`;
            const imageRef = ref(storage, fileName);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            updatedElements[i].contenido = url;
            setElements(updatedElements);
          } catch (error) {
            console.error(`Error subiendo imagen ${i}:`, error);
          }
        }
      }

      // Actualizar estado con los elementos actualizados
      setElements(updatedElements);
    } catch (err) {
      console.error("Error in subir elementos:", err.message);
      setError(err.message);
      alert("Error in subir elementos:", err.message);
    }
  };

  const guardarElementos = async () => {
    try {
        const result = await fetchApiM1(
            ENDPOINTS.GUARDARELEMENTOSARTICULO,
            "POST",
            elements
          );
        
          if (!result.message === "Hijos guardados correctamente"){
            throw new Error("error guardando hijosartct backend");
          }
    } catch (err) {
      console.error("Error in guardarDatos:", err.message);
      setError(err.message);
      alert("Error in guardarElementos:", err.message);
    }
  };
  const guardarDatos = async () => {
    try {
      if (imageUpload == null) {
        guardarArticuloCT(null);
      } else {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        const idImagen = await guardarImagen(url);
        const idArticulo = await guardarArticuloCT(idImagen);
        await subirImagenesElementos(idArticulo);
        await guardarElementos();
        alert("Datos Guardados Correctamente");
        navigate("/pages/ArticuloCTDash");
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
          <h2 className="tituloPaginaWizard">Datos ArticuloCT</h2>
        </div>
        <div className="body">
          <P1WizardArticuloCT
            formData={formData}
            setFormData={setFormData}
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            image={image}
            setImage={setImage}
            elements={elements}
            setElements={setElements}
          />
          <BlogEditor elements={elements} setElements={setElements} />
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

export default WizardForm;
