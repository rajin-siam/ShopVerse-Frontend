import { useEffect, useState } from "react";
import ProductTable from "../components/Products/ProductTable";
import AddProductModal from "../components/modals/AddProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import UploadImageModal from "../components/modals/UploadImageModal";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [imageProductId, setImageProductId] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/public/products?pageNumber=${pageNumber}&pageSize=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [pageNumber]);

  const handleAddProduct = async (newProduct) => {
    try {
      const categoryId = 1; // Replace this with selected category logic
      await fetch(
        `http://localhost:8081/api/admin/categories/${categoryId}/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      fetchProducts();
    } catch (err) {
      console.error("Add product failed", err);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await fetch(
        `http://localhost:8081/api/admin/products/${updatedProduct.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      fetchProducts();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:8081/api/admin/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUploadImageClick = (productId) => {
    setImageProductId(productId);
    setShowUploadModal(true);
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/public/categories");
      const json = await res.json();
      const data = json.content || json;
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Product Management</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setShowAddModal(true)}

        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={handleEditClick}
        onDelete={handleDeleteProduct}
        onUploadImage={handleUploadImageClick} // Passing the correct handler here
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-3">
        <button
          onClick={() => setPageNumber((prev) => Math.max(0, prev - 1))}
          disabled={pageNumber === 0}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>
        <span className="self-center">
          Page {pageNumber + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setPageNumber((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
          }
          disabled={pageNumber + 1 >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
        categories={categories}
      />

      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateProduct}
        initialData={selectedProduct}
        categories={categories}
      />

      <UploadImageModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        productId={imageProductId}
        onUploaded={fetchProducts} // Refresh product list after upload
        categories={categories}
      />
    </div>
  );
};

export default ProductManagementPage;
