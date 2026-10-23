import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="shopnest-footer">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4 col-md-6">
            <div className="footer-about">
              <Link to="/" className="footer-logo">
                Shop<span>Nest</span>
              </Link>
              <p>
                Your one-stop destination for fashion, beauty, electronics, lifestyle
                products, and everything you love.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-column">
              <h3>Categories</h3>
              <ul>
                <li><Link to="/products?category=Clothing">Clothing</Link></li>
                <li><Link to="/products?category=Electronics">Electronics</Link></li>
                <li><Link to="/products?category=Footwear">Footwear</Link></li>
                <li><Link to="/products?category=Books">Books</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-column">
              <h3>Customer Service</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Shipping &amp; Delivery</a></li>
                <li><a href="#">Returns &amp; Refunds</a></li>
                <li><a href="#">Track Your Order</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-contact">
          <div className="contact-item">
            <i className="bi bi-telephone"></i>
            <div>
              <span>Call Us</span>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
          </div>
          <div className="contact-item">
            <i className="bi bi-envelope"></i>
            <div>
              <span>Email Us</span>
              <a href="mailto:support@shopnest.com">support@shopnest.com</a>
            </div>
          </div>
          <div className="contact-item">
            <i className="bi bi-clock"></i>
            <div>
              <span>Support Hours</span>
              <p>Mon - Sat, 9 AM - 6 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ShopNest. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
