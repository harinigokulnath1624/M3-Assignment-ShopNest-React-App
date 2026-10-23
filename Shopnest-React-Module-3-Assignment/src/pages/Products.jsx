import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { data: products, loading, error, retry } = useProducts();
  const [params, setParams] = useSearchParams();

  // Filters live in the URL, so they can be shared and survive "Back".
  const selectedCategory = params.get("category") || "All";
  const searchTerm = (params.get("search") || "").trim().toLowerCase();

  const categories = useMemo(
    () => ["All", ...new Set((products || []).map((p) => p.category))],
    [products],
  );

  const filtered = useMemo(
    () =>
      (products || []).filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, selectedCategory],
  );

  function handleCategory(category) {
    const next = new URLSearchParams(params);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    setParams(next);
  }

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-subtitle">Shop Everything</p>
          <h2>All Products</h2>
          <p className="section-description">
            {searchTerm
              ? `Showing results for "${params.get("search").trim()}"`
              : "Browse our full collection and filter by category."}
          </p>
        </div>

        {loading && <Spinner label="Loading products..." />}

        {error && <ErrorMessage message={error.message} onRetry={retry} />}

        {!loading && !error && (
          <>
            <CategoryFilter categories={categories} selected={selectedCategory} onSelect={handleCategory} />
            <ProductGrid products={filtered} />
          </>
        )}
      </div>
    </section>
  );
}
