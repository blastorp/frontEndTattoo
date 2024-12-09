import React from "react";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../../../state/CartContext";
import { Link } from "react-router-dom";

function FloatingCart() {
  const { getTotalItems } = useCart(); // Get the total items from context
  const totalItems = getTotalItems(); // Get the total number of items in the cart

  return (
    <Link to="/pages/carrito" className="floating-cart">
      {/* Floating cart with icon and text */}
      <div>
        <div className="cart-link">Ir al carrito</div>
        <ShoppingCart style={{ color: "#fff", fontSize: "30px" }} />
        {(
          <div className="cart-count">{totalItems}</div>
        )}
      </div>
    </Link>
  );
}

export default FloatingCart;
