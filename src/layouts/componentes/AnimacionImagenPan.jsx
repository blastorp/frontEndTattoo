import React from 'react'
import ImagenPan from '../../imagenes/ImagenPan.png'
import '../estilos/estiloImagenPan.css'
function AnimacionImagenPan() {
  return (
    <div class="frame-pan">
        <img src={ImagenPan} alt="Panoramic Image" class="image-pan" />
    </div>
  )
}

export default AnimacionImagenPan;