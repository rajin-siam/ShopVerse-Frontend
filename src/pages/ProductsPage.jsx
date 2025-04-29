import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import { SearchBar } from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { useProducts } from "../contexts/ProductsContext";
const ProductsPage = () => {
  const {
    view,
    setView,
   // searchQuery,
    setSearchQuery,
   // selectedCategory,
    setSelectedCategory,
  } = useProducts();

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar setSearchQuery={setSearchQuery} />
      <CategoryFilter onCategorySelect={setSelectedCategory} />

      <div className="flex justify-between mb-4">
        <button
          onClick={() => setView("grid")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Grid View
        </button>
        <button
          onClick={() => setView("list")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          List View
        </button>
      </div>

      {view === "grid" ? <ProductGrid /> : <ProductList />}
    </div>
  );
};

export default ProductsPage;
