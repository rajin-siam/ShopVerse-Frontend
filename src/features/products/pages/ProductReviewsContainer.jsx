// ProductReviewsContainer.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../common/contexts/AuthContext";
import ReviewList from "../components/ProductDetails/ReviewList";
import ReviewForm from "../components/ProductDetails/ReviewForm";
import NoReviews from "../components/ProductDetails/NoReviews";

const ProductReviewsContainer = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const { user } = useAuth();

  // Fetch all reviews for the product
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/public/reviews/product/${productId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Check if user has already reviewed this product
  const fetchUserReview = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`http://localhost:8081/api/public/reviews/my-review/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserReview(data);
      } else if (response.status !== 404) {
        console.error("Error fetching user review:", response.statusText);
      }
    } catch (err) {
      console.error("Error checking user review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  useEffect(() => {
    fetchUserReview();
  }, [productId, user]);

  const handleSubmitReview = async (reviewData) => {
    try {
      const method = userReview ? "PUT" : "POST";
      const url = userReview 
        ? `http://localhost:8081/api/public/reviews/${userReview.id}`
        : "http://localhost:8081/api/public/reviews";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          ...reviewData,
          productId: parseInt(productId),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${userReview ? "update" : "submit"} review`);
      }
      
      // Refresh the reviews list
      fetchReviews();
      fetchUserReview();
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(`Failed to ${userReview ? "update" : "submit"} your review. Please try again.`);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/public/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      
      // Refresh the reviews list
      setUserReview(null);
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      setError("Failed to delete your review. Please try again later.");
    }
  };

  const toggleReviewForm = () => {
    setShowForm(!showForm);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;


  return (
    
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
        <div>
            {console.log("siam")}
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.255 2.763 1.003-5.848-4.25-4.14 5.876-.853L10 2.227l2.626 5.28 5.876.853-4.25 4.14 1.003 5.848z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {averageRating} out of 5 ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
        {user ? (
          userReview && !showForm ? (
            <button
              onClick={toggleReviewForm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit My Review
            </button>
          ) : !showForm ? (
            <button
              onClick={toggleReviewForm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Write a Review
            </button>
          ) : (
            <button
              onClick={toggleReviewForm}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )
        ) : (
          <button
            onClick={() => alert("Please log in to write a review")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Write a Review
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && user && (
        <ReviewForm 
          initialData={userReview} 
          onSubmit={handleSubmitReview} 
          onCancel={toggleReviewForm}
        />
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading reviews...</p>
        </div>
      ) : reviews.length > 0 ? (
        <ReviewList 
          reviews={reviews} 
          currentUser={user} 
          onDelete={handleDeleteReview}
          onEdit={() => {
            setShowForm(true);
          }}
        />
      ) : (
        <NoReviews />
      )}
    </div>
  );
};

export default ProductReviewsContainer;