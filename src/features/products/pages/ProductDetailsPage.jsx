import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/productsApi";
import { useCart } from "./../../../common/contexts/CartContext";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [visibleSections, setVisibleSections] = useState({
    specifications: true,
    description: true,
    reviews: true,
    showAll: true,
  });
  const { handleAddToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(productId);
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  // Parse the description string that uses | as separators
  const formatDescription = (description) => {
    if (!description) return [];
    return description.split("|").filter((item) => item.trim().length > 0);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const addToCart = () => {
    handleAddToCart(productId, quantity);
  };

  const toggleSection = (section) => {
    setVisibleSections((prev) => {
      const newSections = {};
      // Set all sections to false first
      Object.keys(prev).forEach((key) => {
        newSections[key] = false;
      });
      // Toggle the targeted section
      newSections[section] = true;
      return newSections;
    });
  };

  const showAllSections = () => {
    setVisibleSections({
      specifications: true,
      description: true,
      reviews: true,
      showAll: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const descriptionPoints = formatDescription(product.description);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="h-4 w-4 mx-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-indigo-600 transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="h-4 w-4 mx-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-gray-800 font-medium truncate max-w-xs">
              {product.productName}
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Product Layout */}
          <div className="md:flex">
            {/* Left side: Product Image */}
            <div className="md:w-2/5 bg-gray-100 flex items-center justify-center p-8">
              <div className="relative w-full max-w-md">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-auto object-contain rounded-md"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Product Information */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.productName}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-indigo-600">
                      ${product.specialPrice?.toFixed(2)}
                    </span>
                    {product.price &&
                      product.price !== product.specialPrice && (
                        <span className="ml-2 text-lg line-through text-gray-400">
                          ${product.price?.toFixed(2)}
                        </span>
                      )}
                  </div>

                  {/* Stock indicator */}
                  {product.quantity > 0 ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Short description - first point only */}
              {descriptionPoints.length > 0 && (
                <div className="mb-8">
                  <p className="text-gray-600">{descriptionPoints[0]}</p>
                </div>
              )}

              <div className="mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  {/* Quantity selector */}
                  <div className="w-full md:w-1/3">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Quantity
                    </label>
                    <div className="flex rounded-md shadow-sm">
                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-l-md border border-gray-300 hover:bg-gray-100"
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        <span className="sr-only">Decrease</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-center border-gray-300 sm:text-sm"
                      />
                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-r-md border border-gray-300 hover:bg-gray-100"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <span className="sr-only">Increase</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <div className="w-full md:w-2/3">
                    <button
                      onClick={addToCart}
                      disabled={!product.quantity || product.quantity <= 0}
                      className={`w-full py-3 px-6 rounded-lg text-base font-medium shadow-sm flex items-center justify-center
                        ${
                          product.quantity > 0
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional buttons */}
              <div className="flex gap-4">
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Wishlist
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Section Filters */}
          <div className="buttons border-t border-gray-200 p-4">
            <div className="flex flex-wrap gap-2 flex-start">
              <button
                onClick={showAllSections}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all
      bg-indigo-600 text-white
      hover:bg-indigo-700
      active:bg-indigo-800`}
              >
                Show All
              </button>
              <button
                onClick={() => toggleSection("specifications")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all
      ${
        visibleSections.specifications
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
              >
                Specifications
              </button>
              <button
                onClick={() => toggleSection("description")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all
      ${
        visibleSections.description
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
              >
                Description
              </button>
              <button
                onClick={() => toggleSection("reviews")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all
      ${
        visibleSections.reviews
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* Product Details Content */}
          <div className="p-6">
            {/* Specifications Section */}
            {visibleSections.specifications && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Product Specifications
                </h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <dl className="divide-y divide-gray-200">
                    <div className="px-6 py-4">
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Product ID
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {product.productId}
                      </dd>
                    </div>
                    <div className="px-6 py-4">
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Availability
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </dd>
                    </div>
                    <div className="px-6 py-4">
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Price
                      </dt>
                      <dd className="text-sm text-gray-900">
                        ${product.price?.toFixed(2)}
                      </dd>
                    </div>
                    <div className="px-6 py-4">
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Special Price
                      </dt>
                      <dd className="text-sm text-gray-900">
                        ${product.specialPrice?.toFixed(2)}
                      </dd>
                    </div>
                    <div className="px-6 py-4">
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Discount
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {product.discount}%
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {/* Description Section */}
            {visibleSections.description && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Product Description
                </h2>
                <div className="prose max-w-none">
                  {descriptionPoints.length > 0 ? (
                    <ul className="space-y-4">
                      {descriptionPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{point.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      No description available for this product.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {visibleSections.reviews && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h2>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Write a Review
                  </button>
                </div>
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No reviews yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Be the first to review this product.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
