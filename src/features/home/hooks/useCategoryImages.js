import { useState, useEffect } from 'react';

export const useCategoryImages = (categories) => {
  const [imageStates, setImageStates] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const unsplash_api_key = import.meta.env.VITE_UNSPLASH_API_KEY

  useEffect(() => {
    const fetchImages = async () => {
      const newImageStates = {};
      const newImageUrls = {};

      for (const category of categories) {
        newImageStates[category.categoryId] = 'loading';

        try {
          const searchTerm = encodeURIComponent(category.categoryName.toLowerCase());
          const response = await fetch(
            `https://api.unsplash.com/search/photos/?client_id=${unsplash_api_key}&query=${searchTerm}&per_page=1`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }

          const data = await response.json();
          const imageUrl = data.results?.[0]?.urls?.small || `https://via.placeholder.com/100x100?text=${encodeURIComponent(category.categoryName.charAt(0).toUpperCase())}`;
          newImageUrls[category.categoryId] = imageUrl;
          newImageStates[category.categoryId] = 'loaded';
        } catch (error) {
          console.error(`Error fetching image for ${category.categoryName}:`, error);
          newImageUrls[category.categoryId] = `https://via.placeholder.com/100x100?text=${encodeURIComponent(category.categoryName.charAt(0).toUpperCase())}`;
          newImageStates[category.categoryId] = 'error';
        }
      }

      setImageStates(newImageStates);
      setImageUrls(newImageUrls);
    };

    if (categories.length > 0) {
      fetchImages();
    }
  }, [categories]);

  const handleImageError = (categoryId) => {
    setImageStates((prev) => ({
      ...prev,
      [categoryId]: 'error'
    }));
  };

  const handleImageLoad = (categoryId) => {
    setImageStates((prev) => ({
      ...prev,
      [categoryId]: 'loaded'
    }));
  };

  return {
    imageStates,
    imageUrls,
    handleImageError,
    handleImageLoad
  };
};
