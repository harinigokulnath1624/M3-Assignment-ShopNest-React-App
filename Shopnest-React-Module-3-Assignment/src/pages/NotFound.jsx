import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="empty-cart-message">
          <i className="bi bi-compass"></i>
          <h3>Page not found</h3>
          <p>The page you're looking for doesn't exist.</p>
          <Link to="/" className="view-all-btn">Go Home</Link>
        </div>
      </div>
    </section>
  );
}
