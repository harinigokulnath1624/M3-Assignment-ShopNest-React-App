import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import { useProduct } from "../hooks/useProducts";
import { formatINR, getDiscountPercent } from "../utils/format";
import { handleImageError } from "../utils/image";

export default function ProductDetail() {
  const { id } = useParams(); // value from /products/:id
  const { data: product, loading, error, retry } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <section className="page-section">
        <div className="container"><Spinner label="Loading product..." /></div>
      </section>
    );
  }

  if (error) {
    const notFound = error.status === 404;
    return (
      <section className="page-section">
        <div className="container">
          <ErrorMessage
            message={notFound ? "Sorry, this product doesn't exist." : error.message}
            onRetry={notFound ? undefined : retry}
          />
          <div className="text-center mt-4">
            <Link to="/products" className="view-all-btn">Back to Products</Link>
          </div>
        </div>
      </section>
    );
  }

  const savings = product.originalPrice - product.price;

  return (
    <section className="page-section">
      <div className="container">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        <div className="row g-5 align-items-start">
          <div className="col-md-6">
            <div className="detail-image">
              <span className="discount-badge">{getDiscountPercent(product)}% OFF</span>
              <img src={product.imageUrl} alt={product.name} onError={handleImageError} />
            </div>
          </div>

          <div className="col-md-6 detail-info">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>

            <StarRating rating={product.rating} />

            <div className="detail-price">
              <span className="discounted-price">{formatINR(product.price)}</span>
              <span className="original-price">{formatINR(product.originalPrice)}</span>
              <span className="detail-save">You save {formatINR(savings)}</span>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-quantity">
              <span>Quantity</span>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-btn"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  type="button"
                  className="quantity-btn"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <AddToCartButton product={product} quantity={quantity} />
              <Link to="/cart" className="view-all-btn">Go to Cart</Link>
            </div>

            <ul className="detail-perks">
              <li><i className="bi bi-truck"></i> Free delivery on orders above ₹999</li>
              <li><i className="bi bi-arrow-repeat"></i> 7-day easy returns</li>
              <li><i className="bi bi-shield-check"></i> Secure payments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
