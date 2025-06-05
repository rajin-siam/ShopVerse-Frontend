// Updated ProductDetailsContainer.jsx
import React, { useState, useEffect } from "react";
import { fetchProductById } from "../api/productsApi";
import { useCart } from "../../../common/contexts/CartContext";

// Import components
import Breadcrumb from "../components/ProductDetails/Breadcrumb";
import LoadingSpinner from "../components/ProductDetails/LoadingSpinner";
import ErrorDisplay from "../components/ProductDetails/ErrorDisplay";
import NotFoundDisplay from "../components/ProductDetails/NotFoundDisplay";
import ProductImageSection from "../components/ProductDetails/ProductImageSection";
import ProductInfoSection from "../components/ProductDetails/ProductInfoSection";
import ProductSpecifications from "../components/ProductDetails/ProductSpecifications";
import ProductDescription from "../components/ProductDetails/ProductDescription";
import ProductReviews from "./ProductReviews";
import WishlistAndShareButtons from "../components/ProductDetails/WishlistAndShareButtons";
import { API_CONFIG } from "../../../common/constants/config";

const ProductDetailsContainer = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const { handleAddToCart } = useCart();

  // Fetch product details
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(productId);
        setProduct(productData);
        
        // Check wishlist status
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/public/wishlist/check/${productId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setIsInWishlist(data.isInWishlist);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  // Handle wishlist toggle
  const toggleWishlist = async () => {
    try {
      const endpoint = isInWishlist
        ? `${API_CONFIG.BASE_URL}/public/wishlist/remove/${productId}`
        : `${API_CONFIG.BASE_URL}/public/wishlist/add/${productId}`;
      
      const method = isInWishlist ? "DELETE" : "POST";
      
      await fetch(endpoint, {
        method,
        credentials: "include",
      });
      
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  // Quantity handlers
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => handleAddToCart(productId, quantity);

  // Parse description points
  const getDescriptionPoints = (description) => {
    if (!description) return [];
    return description.split("|").filter(item => item.trim().length > 0);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;
  if (!product) return <NotFoundDisplay />;

  const descriptionPoints = getDescriptionPoints(product.description);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb productName={product.productName} />

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <ProductImageSection
              image={product.image}
              productName={product.productName}
              discount={product.discount}
            />

            <ProductInfoSection
              product={product}
              descriptionPoints={descriptionPoints}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onAddToCart={addToCart}
            />
          </div>

          <div className="mt-4 px-6">
            <WishlistAndShareButtons
              isInWishlist={isInWishlist}
              onWishlistToggle={toggleWishlist}
              productId={productId}
            />
          </div>

          <div className="p-6">
            <ProductSpecifications product={product} />
            <ProductDescription descriptionPoints={descriptionPoints} />
            <ProductReviews productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
