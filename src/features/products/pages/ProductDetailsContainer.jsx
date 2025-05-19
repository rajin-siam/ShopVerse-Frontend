// Updated ProductDetailsContainer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProductById } from "../api/productsApi";
import { useCart } from "./../../../common/contexts/CartContext";

// Import dumb components
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


const ProductDetailsContainer = ({ productId }) => {
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

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { handleAddToCart } = useCart();

  useEffect(() => {
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
      checkWishlistStatus();
    };

    const checkWishlistStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/public/wishlist/check/${productId}`,{
            credentials: 'include',
          }
        );
        const data = await response.json();
        setIsInWishlist(data.isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  const toggleWishlist = async () => {
    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await fetch(
          `http://localhost:8081/api/public/wishlist/remove/${productId}`,
          {
            method: "DELETE",
            credentials: 'include',
          }
        );
      } else {
        await fetch(
          `http://localhost:8081/api/public/wishlist/add/${productId}`,
          {
            method: "POST",
            credentials: 'include',
          }
        );
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Handlers
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    handleAddToCart(productId, quantity);
  };

  // Parse the description string that uses | as separators
  const formatDescription = (description) => {
    if (!description) return [];
    return description.split("|").filter((item) => item.trim().length > 0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!product) {
    return <NotFoundDisplay />;
  }

  const descriptionPoints = formatDescription(product.description);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb productName={product.productName} />

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Product Layout */}
          <div className="md:flex">
            {/* Left side: Product Image */}
            <ProductImageSection
              image={product.image}
              productName={product.productName}
              discount={product.discount}
            />

            {/* Right side: Product Information */}
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
            />
          </div>

          {/* Product Details Content */}
          <div className="p-6">
            {/* Specifications Section */}
            {visibleSections.specifications && (
              <ProductSpecifications product={product} />
            )}

            {/* Description Section */}
            {visibleSections.description && (
              <ProductDescription descriptionPoints={descriptionPoints} />
            )}

            {/* Reviews Section - Pass the product ID to the ProductReviews component */}
            {visibleSections.reviews && <ProductReviews productId={productId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;