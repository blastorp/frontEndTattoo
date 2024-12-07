import React, { useState } from "react";
import { products } from "../pages/mockData";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CarritoDeCompras() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // If the product exists, update its quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }  // Increase quantity of existing product
            : item
        );
      } else {
        // If product is not in the cart, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) =>
          product.categories.includes(selectedCategory)
        );

  return (
    <div className="contenedorContenidoPagina">
      {/* Left Panel: Category Filter */}
      <div className="left-panel">
        <h3 className="filter-title">Filter by Category</h3>
        <ul className="category-list">
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

      {/* Right Panel: Product Grid */}
      <div className="right-panel">
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

        {/* Cart Section */}
        <div className="cart">
          <h3 className="cart-title">Your Cart</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {/* Clear Cart Button */}
          {cartItems.length > 0 && (
            <button onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {/* Floating Cart Icon */}
      <div className="floating-cart" onClick={() => console.log("Cart Clicked")}>
        <ShoppingCartIcon />
        {cartItems.length > 0 && (
          <div className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</div>
        )}
      </div>
    </div>
  );
}

export default CarritoDeCompras;