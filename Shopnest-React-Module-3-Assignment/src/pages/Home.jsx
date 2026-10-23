import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import ProductGrid from "../components/ProductGrid";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useProducts } from "../hooks/useProducts";

// "Shop by category" tiles -> link into the Products page.
const categoryTiles = [
  { title: "Fashion", text: "Discover Your Style", image: "fashion.jpg", to: "/products?category=Clothing" },
  { title: "Beauty", text: "Glow With Confidence", image: "beauty.jpg", to: "/products?search=perfume" },
  { title: "Jewellery", text: "Shine Every Day", image: "jewellery.jpg", to: "/products" },
  { title: "Bags", text: "Carry Your Style", image: "bags.jpg", to: "/products?search=handbag" },
  { title: "Shoes", text: "Step Into Comfort", image: "shoes.jpg", to: "/products?category=Footwear" },
  { title: "Home & Living", text: "Make Your Space Beautiful", image: "home.jpg", to: "/products" },
];

export default function Home() {
  const { data: products, loading, error, retry } = useProducts();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Top 6 best-rated products.
  const featured = useMemo(
    () => (products ? [...products].sort((a, b) => b.rating - a.rating).slice(0, 6) : []),
    [products],
  );

  function handleSubscribe(event) {
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <>
      <HeroCarousel />

      {/* Featured products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-heading text-center">
            <p className="section-subtitle">Shop Our Bestsellers</p>
            <h2>Featured Products</h2>
            <p className="section-description">
              Discover our most popular products, carefully selected just for you.
            </p>
          </div>

          {loading && <Spinner label="Loading featured products..." />}
          {error && <ErrorMessage message={error.message} onRetry={retry} />}
          {!loading && !error && (
            <>
              <ProductGrid products={featured} />
              <div className="view-all-container text-center">
                <Link to="/products" className="view-all-btn">View All Products</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Shop by category */}
      <section className="categories-section">
        <div className="container">
          <div className="section-heading text-center">
            <p className="section-subtitle">Explore Our Collections</p>
            <h2>Shop by Category</h2>
            <p className="section-description">
              Find everything you need from our carefully selected collections.
            </p>
          </div>

          <div className="row g-4">
            {categoryTiles.map((tile) => (
              <div className="col-lg-4 col-md-6" key={tile.title}>
                <Link to={tile.to} className="category-card">
                  <img
                    src={`/images/categories/${tile.image}`}
                    alt={tile.title}
                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  />
                  <div className="category-overlay">
                    <div>
                      <h3>{tile.title}</h3>
                      <p>{tile.text}</p>
                      <span className="category-link">Shop Now →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-section">
        <div className="container">
          <div className="about-content text-center">
            <p className="about-label">ABOUT SHOPNEST</p>
            <h2>
              Everything You Love, <span>All In One Place.</span>
            </h2>
            <p className="about-description">
              Welcome to ShopNest, your one-stop destination for discovering products you
              love at prices you'll appreciate. We bring a wide range of products together
              to make your shopping experience simple, convenient, and enjoyable.
            </p>
            <p className="about-description">
              From fashion and beauty to accessories, footwear, and home essentials,
              ShopNest makes it easy to discover something special for every style and
              every occasion.
            </p>

            <div className="about-highlights">
              {["Quality Products", "Great Deals", "Secure Shopping", "Customer First"].map((item) => (
                <div className="about-highlight" key={item}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link to="/products" className="about-btn">
              Explore ShopNest <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-content">
              <p className="newsletter-label">STAY CONNECTED</p>
              <h2>Stay Updated With ShopNest</h2>
              <p className="newsletter-description">
                Subscribe to our newsletter and be the first to know about new products,
                exclusive offers, and exciting deals.
              </p>

              {subscribed ? (
                <p className="newsletter-offer" role="status">
                  <i className="bi bi-check-circle"></i> Thanks for subscribing! Check your inbox for your 10% off code.
                </p>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
              )}

              <p className="newsletter-offer">
                <i className="bi bi-gift"></i> Get <strong>10% OFF</strong> your first order
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
