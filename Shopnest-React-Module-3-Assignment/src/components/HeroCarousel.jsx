import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleImageError } from "../utils/image";

const slides = [
  {
    image: "/images/banners/b1.png",
    alt: "ShopNest beauty and lifestyle collection",
    className: "",
    content: (
      <>
        <p className="hero-small-text">Everything</p>
        <h1>
          YOU LOVE,
          <br />
          ALL AT <span>ONE PLACE</span>
        </h1>
        <p className="hero-description">
          From beauty to fashion, lifestyle to essentials —
          <br />
          find it all here, made for you.
        </p>
      </>
    ),
  },
  {
    image: "/images/banners/b2.png",
    alt: "ShopNest latest dress collection",
    className: "dress-content",
    content: (
      <>
        <p className="hero-small-text">Latest</p>
        <h1>
          DRESS
          <br />
          <span>COLLECTION</span>
        </h1>
        <p className="offer-text">
          UP TO <strong>50%</strong> OFF
        </p>
        <p className="hero-description">On your favorite styles</p>
      </>
    ),
  },
  {
    image: "/images/banners/b3.png",
    alt: "ShopNest electronics collection",
    className: "electronics-content",
    content: (
      <>
        <p className="hero-small-text">Amazing</p>
        <h1>
          STUFFS
          <br />
          <span>AT AMAZING</span>
          <br />
          PRICES
        </h1>
        <p className="hero-description">
          Upgrade your tech with the latest
          <br />
          gadgets and electronics.
        </p>
      </>
    ),
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 5 seconds.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (i) => setIndex((i + slides.length) % slides.length);

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel slide">
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === index ? "active" : ""}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, i) => (
            <div key={slide.image} className={`carousel-item ${i === index ? "active" : ""}`}>
              <img
                src={slide.image}
                className="d-block w-100 hero-image"
                alt={slide.alt}
                onError={handleImageError}
              />
              <div className={`hero-content ${slide.className}`}>
                {slide.content}
                <div className="hero-buttons">
                  <Link to="/products" className="hero-btn shop-btn">Shop Now</Link>
                  <Link to="/products" className="hero-btn deals-btn">View Deals</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="carousel-control-prev" onClick={() => go(index - 1)}>
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button type="button" className="carousel-control-next" onClick={() => go(index + 1)}>
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
