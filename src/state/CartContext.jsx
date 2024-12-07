import React, { createContext, useState, useContext } from 'react';

// Create context for cart
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// CartProvider component to provide cart state to the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add or update item quantity in the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (itemIndex === -1) {
        // Item is not in cart, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      } else {
        // Item is already in cart, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get the total quantity of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
