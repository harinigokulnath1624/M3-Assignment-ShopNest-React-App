import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

// Adds a product to the cart and briefly shows "Added to Cart".
export default function AddToCartButton({ product, quantity = 1, className = "" }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  function handleClick(event) {
    event.stopPropagation(); // don't trigger the card's navigation
    addToCart(product, quantity);
    setAdded(true);
  }

  return (
    <button
      type="button"
      className={`add-cart-btn ${added ? "added" : ""} ${className}`}
      onClick={handleClick}
    >
      {added ? (
        <>
          <i className="bi bi-check-circle"></i> Added to Cart
        </>
      ) : (
        <>
          <i className="bi bi-cart-plus"></i> Add to Cart
        </>
      )}
    </button>
  );
}
