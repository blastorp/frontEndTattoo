import { useState } from 'react';
import '../estilos/membresia.css'; 
import fetchApiM2  from "../../../services/api/fetchApiM2";
import ENDPOINTS  from "../../../services/api/endpoints";

const Membresia = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = 4; // Número total de tarjetas
  const cardsToShow = 3; // Cantidad de tarjetas visibles
  const cardWidth = 350; // Ancho de cada tarjeta (ajústalo según corresponda)
  const maxIndex = totalCards - cardsToShow; // Último índice permitido

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
<div >
    <h1>Membresía</h1>
    <div className="membership-carousel-wrapper">
      <button className="carousel-nav prev-btn" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="membership-carousel">
        <div
          className="membership-cards"
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)`, width: `${totalCards * cardWidth}px` }}
        >
          <div className="card">
            <h3 className="membership-name">Membresía Básica</h3>
            <p className="membership-price">$10/mes</p>
            <ul className="membership-benefits">
              <li>Acceso a contenido exclusivo</li>
              <li>Soporte prioritario</li>
              <li>Descuentos especiales</li>
            </ul>
            <button className="choose-button">Elegir</button>
          </div>
          <div className="card">
            <h3 className="membership-name">Membresía Premium</h3>
            <p className="membership-price">$25/mes</p>
            <ul className="membership-benefits">
              <li>Todo en Básica, más...</li>
              <li>Acceso ilimitado a todo el contenido</li>
              <li>Consultas personalizadas</li>
            </ul>
            <button className="choose-button">Elegir</button>
          </div>
          <div className="card">
            <h3 className="membership-name">Membresía VIP</h3>
            <p className="membership-price">$50/mes</p>
            <ul className="membership-benefits">
              <li>Todo en Premium, más...</li>
              <li>Acceso anticipado a nuevos productos</li>
              <li>Descuentos exclusivos en productos</li>
            </ul>
            <button className="choose-button">Elegir</button>
          </div>
          <div className="card">
            <h3 className="membership-name">Membresía Gold</h3>
            <p className="membership-price">$75/mes</p>
            <ul className="membership-benefits">
              <li>Todo en VIP, más...</li>
              <li>Soporte técnico 24/7</li>
              <li>Acceso ilimitado a eventos exclusivos</li>
            </ul>
            <button className="choose-button">Elegir</button>
          </div>
        </div>
      </div>
      <button className="carousel-nav next-btn" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
    </div>
  );
};

export default Membresia;
