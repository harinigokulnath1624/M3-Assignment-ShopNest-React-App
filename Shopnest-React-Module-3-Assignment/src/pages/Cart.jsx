import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { TAX_RATE, useCart } from "../context/CartContext";
import { formatINR } from "../utils/format";

export default function Cart() {
  const { cart, totalItems, subtotal, tax, total, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleClear() {
    if (window.confirm("Are you sure you want to clear your cart?")) clearCart();
  }

  function handlePlaceOrder() {
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="empty-cart-message order-success" role="status">
            <i className="bi bi-bag-check"></i>
            <h3>Order placed successfully with ShopNest!</h3>
            <p>Thank you for shopping with us.</p>
            <Link to="/products" className="view-all-btn">Continue Shopping</Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="empty-cart-message">
            <i className="bi bi-cart-x"></i>
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart.</p>
            <Link to="/products" className="view-all-btn">Browse Products</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-title">
          <h1>Your Shopping Cart</h1>
          <p>{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <button type="button" className="clear-cart-btn cart-clear" onClick={handleClear}>
              <i className="bi bi-trash"></i> Clear Cart
            </button>
          </div>

          <div className="col-lg-4">
            <aside className="cart-summary order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated tax ({Math.round(TAX_RATE * 100)}% GST)</span>
                <span>{formatINR(tax)}</span>
              </div>

              <div className="cart-total-row">
                <span>Total</span>
                <strong>{formatINR(total)}</strong>
              </div>

              <button type="button" className="place-order-btn summary-order-btn" onClick={handlePlaceOrder}>
                <i className="bi bi-bag-check"></i> Place Order
              </button>

              <Link to="/products" className="continue-link">← Continue Shopping</Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
