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
    handlePageChange,
    updateProductDiscount,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Product Management
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your product inventory and listings
              </p>
            </div>
            <button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg 
                         transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-indigo-200"
              onClick={() => handleModal("Add")}
            >
              + Add New Product
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner className="w-16 h-16 text-indigo-600" />
          </div>
        ) : (
          <>
            {/* Product Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <ProductTable
                products={products}
                onEdit={(product) => handleModal("Edit", product)}
                onDelete={deleteProduct}
                onUploadImage={(productId) => handleModal("Upload", { productId })}
                onUpdateDiscount={updateProductDiscount} 
              />
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={pagination.pageNumber}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm"
              />
            </div>
          </>
        )}

        {/* Modals */}
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
    </div>
  );
};

export default ProductsManagementPage;

