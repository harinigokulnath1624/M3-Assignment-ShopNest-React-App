import { Link, useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import StarRating from "./StarRating";
import { formatINR, getDiscountPercent } from "../utils/format";
import { handleImageError } from "../utils/image";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const detailsUrl = `/products/${product.id}`;

  return (
    <div className="product-card clickable" onClick={() => navigate(detailsUrl)}>
      <div className="product-image">
        <span className="discount-badge">{getDiscountPercent(product)}% OFF</span>
        <img src={product.imageUrl} alt={product.name} onError={handleImageError} />
      </div>

      <div className="product-info">
        <h3>
          {/* A real link keeps keyboard + screen-reader users covered */}
          <Link to={detailsUrl} onClick={(e) => e.stopPropagation()} className="product-title-link">
            {product.name}
          </Link>
        </h3>

        <StarRating rating={product.rating} />

        <div className="product-price">
          <span className="original-price">{formatINR(product.originalPrice)}</span>
          <span className="discounted-price">{formatINR(product.price)}</span>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
