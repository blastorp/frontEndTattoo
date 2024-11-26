
import React, { useState, useEffect } from "react";

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
        nombre: "",
        nombreArt: "",
        nroIdentificacion: "",
        descripcionArt: "",
        telefono: "",
        email: "",
        fechaCreacion: "",
        publicado: "",
        urlImagen: ""
    });


    const [imageUpload, setImageUpload] = useState(null);
  
    const FormTitles = ["Datos Personales", "Datos Ficha Artista", "Galeria"];
  
    useEffect(() => {
      
    }, []);

    const PageDisplay = () => {
      if (page === 0) {
        return <P1WizardArtista formData={formData} setFormData={setFormData} />;
      } else if (page === 1) {
        return <P2WizardArtista formData={formData} setFormData={setFormData}
                                 setImageUpload ={setImageUpload}/>;
      } else {
        return <P3WizardArtista formData={formData} setFormData={setFormData} />;
      }
    };
  
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
                  alert("FORM SUBMITTED");
                  console.log(formData);
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