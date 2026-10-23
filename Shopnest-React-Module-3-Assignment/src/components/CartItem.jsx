import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/format";
import { handleImageError } from "../utils/image";

// Reads and updates the cart straight from context - no props needed
// besides the item itself.
export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <Link to={`/products/${item.id}`}>
        <img src={item.imageUrl} alt={item.name} className="cart-item-image" onError={handleImageError} />
      </Link>

      <div className="cart-item-info">
        <h4>
          <Link to={`/products/${item.id}`} className="product-title-link">
            {item.name}
          </Link>
        </h4>
        <p className="cart-item-price">{formatINR(item.price)}</p>
      </div>

      <div className="quantity-controls">
        <button
          type="button"
          className="quantity-btn"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => decreaseQuantity(item.id)}
        >
          −
        </button>
        <span className="quantity">{item.quantity}</span>
        <button
          type="button"
          className="quantity-btn"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => increaseQuantity(item.id)}
        >
          +
        </button>
      </div>

      <strong className="cart-item-total">{formatINR(item.price * item.quantity)}</strong>

      <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)}>
        <i className="bi bi-trash"></i> Remove
      </button>
    </div>
  );
}
