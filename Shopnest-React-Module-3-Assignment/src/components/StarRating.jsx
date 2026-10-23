// Shows partially-filled stars, e.g. 4.3 -> four and a bit stars.
export default function StarRating({ rating }) {
  return (
    <div className="product-rating">
      <span className="stars-wrap" aria-hidden="true">
        <span className="stars-bg">★★★★★</span>
        <span className="stars-fill" style={{ width: `${(rating / 5) * 100}%` }}>
          ★★★★★
        </span>
      </span>
      <span className="rating-number">{rating}</span>
    </div>
  );
}
