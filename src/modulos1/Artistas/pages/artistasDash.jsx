import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin'
import TarjetaLinkAdd from '../components/TarjetaLInkAdd'

interface Post {
  id: Number;
  title: String;
}
function ArtistasDash() {
  return (
    <MainAdmin tituloPagina={"Administracion Perfiles de Artistas"}>
        <div>ArtistasDash</div>
        <div>asdf</div>
        <TarjetaLinkAdd/>
    </MainAdmin>
   ) 
}

export default ArtistasDash;