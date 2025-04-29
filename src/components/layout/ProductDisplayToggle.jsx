import { useProducts } from "../contexts/ProductsContext";

const ViewToggle = () => {
  const { view, setView } = useProducts();

  return (
    <div className="flex mb-4">
      <button
        onClick={() => setView("grid")}
        className={`px-4 py-2 ${
          view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Grid View
      </button>
      <button
        onClick={() => setView("list")}
        className={`px-4 py-2 ${
          view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        List View
      </button>
    </div>
  );
};

export default ViewToggle;
