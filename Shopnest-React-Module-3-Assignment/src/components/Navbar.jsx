import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart(); // global cart state, no props
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const onProductsPage = pathname === "/products";
  const urlSearch = params.get("search") || "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(urlSearch);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Keep the box in sync with the URL while on the Products page.
  useEffect(() => {
    if (onProductsPage) setQuery(urlSearch);
  }, [onProductsPage, urlSearch]);

  // Live search: typing sends you to /products?search=...
  function handleSearch(event) {
    const value = event.target.value;
    setQuery(value);

    const next = new URLSearchParams(onProductsPage ? params : undefined);
    if (value.trim()) next.set("search", value);
    else next.delete("search");

    navigate({ pathname: "/products", search: next.toString() }, { replace: onProductsPage });
  }

  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-icon">S</span>
          <span className="logo-text">ShopNest</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="shopNestNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="shopNestNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to="/" end className={linkClass}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={linkClass}>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className={linkClass}>Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            </li>
          </ul>

          <div className="navbar-actions">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                autoComplete="off"
                value={query}
                onChange={handleSearch}
                aria-label="Search products"
              />
              <span className="search-btn search-icon" aria-hidden="true">
                <i className="bi bi-search"></i>
              </span>
            </div>

            <Link to="/cart" className="icon-btn cart-button" aria-label={`Cart, ${totalItems} items`}>
              <i className="bi bi-cart3"></i>
              <span className="cart-count">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
