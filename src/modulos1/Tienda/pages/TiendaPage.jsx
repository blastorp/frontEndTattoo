import React from 'react'
import MainAdmin from '../../../layouts/MainAdmin2'
import '../estilos/ArtistasDash.css'
import { ShoppingCart } from '@mui/icons-material';

function TiendaPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  return (
    <MainAdmin tituloPagina={"Tienda"}>
        <div className='contenedorContenidoPagina' >
        <ShoppingCart />
        </div>      
    </MainAdmin>
   ) 
}

export default TiendaPage;



