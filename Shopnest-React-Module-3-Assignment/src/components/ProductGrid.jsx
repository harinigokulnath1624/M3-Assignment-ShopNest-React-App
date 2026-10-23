import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="no-products-message">
        <i className="bi bi-search"></i>
        <h3>No products found</h3>
        <p>Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
