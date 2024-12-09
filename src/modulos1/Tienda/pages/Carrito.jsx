import MainAdmin from "../../../layouts/MainAdmin1";
import "../estilos/TiendaPage.css";
import { useCart } from "../../../state/CartContext";
import { Link } from "react-router-dom";

function Carrito() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    getTotalItems,
  } = useCart();
  const totalItems = getTotalItems(); // Get the total number of items in the cart
  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <MainAdmin tituloPagina={"Productos en el carrito"}>
      <div className="cart">
        <h3 className="cart-title">Your Cart</h3>
        <Link to="/pages/tienda" className="floating-cart">
          <div>
            <div className="cart-back-link">Volver</div>
          </div>
        </Link>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                {/* Product Info */}
                <div className="cart-item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} >-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      readOnly
                    />
                    <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item-btn"
                  >
                    Remove
                  </button>
                </div>
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

        {/* Total Section */}
        {cartItems.length > 0 && (
          <div className="total-section">
            <p className="total-label">Total:</p>
            <p className="total-amount">${totalPrice.toFixed(2)}</p>
          </div>
        )}

        {/* Proceed to Checkout Button */}
        {cartItems.length > 0 && (
          <button className="proceed-to-checkout-btn">
            Proceed to Checkout ({totalItems} items)
          </button>
        )}
      </div>
    </MainAdmin>
  );
}

export default Carrito;
