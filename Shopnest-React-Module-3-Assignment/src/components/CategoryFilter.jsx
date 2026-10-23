export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-filters mb-4">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-btn ${selected === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
