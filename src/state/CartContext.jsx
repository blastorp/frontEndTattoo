import React, { createContext, useState, useContext } from "react";

// Create context for cart
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Initial State
const initialState = {
  items: [],
};


// CartProvider component to provide cart state to the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add or update item quantity in the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // If the product exists, update its quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // Increase quantity of existing product
            : item
        );
      } else {
        // If product is not in the cart, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Get the total quantity of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // CartContext.js

const updateQuantity = (itemId, quantity) => {
  setCartItems((prevItems) => 
    prevItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    )
  );
};


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalItems, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};