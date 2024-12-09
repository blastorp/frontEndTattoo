import React, { useState } from "react";
import { products } from "../pages/mockData";
import { useCart } from "../../../state/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CarritoDeCompras() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart, cartItems } = useCart();

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) =>
          product.categories.includes(selectedCategory)
        );

  return (
    <div className="contenedorContenidoPagina">
      {/* Center Panel: Category Filter */}
      <div className="filter-bar">
        <h3 className="filter-title">Filter by Category</h3>
        <ul className="category-list-horizontal">
          <li>
            <button onClick={() => setSelectedCategory("all")}>All</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("cups")}>Cups</button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("apparel")}>
              Apparel
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedCategory("tattoo kits")}>
              Tattoo Kits
            </button>
          </li>
          {/* Add more categories as needed */}
        </ul>
      </div>

      {/* Center Panel: Product Grid */}
      <div className="center-panel">
        <h2 className="product-title">Selección de Productos</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarritoDeCompras;