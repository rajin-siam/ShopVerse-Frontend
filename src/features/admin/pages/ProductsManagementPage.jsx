import { useState, useEffect } from "react";
import { useAdminProducts } from "../hooks/useAdminProducts";
import ProductTable from "../components/Products/ProductTable";
import AddProductModal from "../components/modals/AddProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import UploadImageModal from "../components/modals/UploadImageModal";
import Pagination from "../../../shared/components/common/Pagination";
import LoadingSpinner from "../../../shared/components/common/LoadingSpinner";
import ErrorMessage from "../../../shared/components/common/ErrorMessage";

const ProductsManagementPage = () => {
  const {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    handlePageChange
  } = useAdminProducts();

  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState({
    showAdd: false,
    showEdit: false,
    showUpload: false,
    selectedProduct: null,
    imageProductId: null
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/public/categories");
      const data = await res.json();
      setCategories(data.content || data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [pagination.pageNumber]);

  const handleModal = (type, product = null) => {
    setModalState(prev => ({
      ...prev,
      [`show${type}`]: !prev[`show${type}`],
      selectedProduct: product,
      imageProductId: product?.productId || null
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => handleModal("Add")}
        >
          + Add Product
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProductTable
            products={products}
            onEdit={(product) => handleModal("Edit", product)}
            onDelete={deleteProduct}
            onUploadImage={(productId) => handleModal("Upload", { productId })}
          />

          <Pagination
            currentPage={pagination.pageNumber}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <AddProductModal
        isOpen={modalState.showAdd}
        onClose={() => handleModal("Add")}
        onSubmit={(data) => createProduct(data.categoryId, data)}
        categories={categories}
      />

      <EditProductModal
        isOpen={modalState.showEdit}
        onClose={() => handleModal("Edit")}
        onSubmit={(data) => updateProduct(data.productId, data)}
        initialData={modalState.selectedProduct}
        categories={categories}
      />

      <UploadImageModal
        isOpen={modalState.showUpload}
        onClose={() => handleModal("Upload")}
        productId={modalState.imageProductId}
        onUploaded={fetchProducts}
      />
    </div>
  );
};

export default ProductsManagementPage;