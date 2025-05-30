import React, { useState } from "react";

const WishlistAndShareButtons = ({ isInWishlist, onWishlistToggle, productId }) => {
  const [shareLoading, setShareLoading] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    setShareLoading(true);
    try {
      // Get the current product URL
      const productUrl = `${window.location.origin}/product/${productId}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(productUrl);
      
      // Show success feedback
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000); // Hide success message after 2 seconds
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = `${window.location.origin}/product/${productId}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (fallbackError) {
        console.error("Fallback copy also failed:", fallbackError);
        alert("Unable to copy link. Please copy the URL manually from your browser.");
      }
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={onWishlistToggle}
        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill={isInWishlist ? "#ef4444" : "none"}
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
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
      
      {/* Share button with copy functionality */}
      <button 
        onClick={handleShare}
        disabled={shareLoading}
        className={`flex-1 py-2 px-4 border rounded-lg transition-colors flex items-center justify-center ${
          shareSuccess 
            ? 'border-green-300 text-green-700 bg-green-50' 
            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
        } ${shareLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {shareLoading ? (
          <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : shareSuccess ? (
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
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
        )}
        {shareSuccess ? "Link Copied!" : "Share"}
      </button>
    </div>
  );
};

export default WishlistAndShareButtons;