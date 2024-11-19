
import React, { useState } from "react";

// cambio
import SignUpInfo from "../components/P1WizardArtista";
import PersonalInfo from "../components/P2WizardArtista";
import OtherInfo from "../components/P3WizardArtista";
import WizardForm from "../components/WizardForm";
import MainAdmin from "../../../layouts/MainAdmin";

function ArtistasAddArtista() {
  
  return (
    <MainAdmin tituloPagina={"Administracion Perfiles de Artistas"}>
        
        <WizardForm />
        

    </MainAdmin>
 
  )
  
}

export default ArtistasAddArtista
