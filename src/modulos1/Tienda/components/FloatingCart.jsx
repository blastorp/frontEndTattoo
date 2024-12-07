import React from "react";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../../../state/CartContext";

function FloatingCart() {
  const { getTotalItems } = useCart(); // Get the total items from context
  const totalItems = getTotalItems(); // Get the total number of items in the cart

  return (
    <div className="floating-cart">
      <ShoppingCart style={{ color: "#fff", fontSize: "30px" }} />
      {totalItems > 0 && (
        <div className="cart-count">{totalItems}</div> // Display total items
      )}
    </div>
  );
}

export default FloatingCart;