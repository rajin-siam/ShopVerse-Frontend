// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext';
import { useProducts } from '../common/contexts/ProductsContext';
import { 
  fetchAllProducts, 
  fetchProductById 
} from '../features/products/api/productsApi';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalCustomers: 0
  });

  const { user } = useAuth();
  const { setSelectedCategory } = useProducts();

  useEffect(() => {
    setIsVisible(true);
    fetchHomePageData();
  }, []);

  useEffect(() => {
    if (heroSlides.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [heroSlides]);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [
        productsData,
        categoriesData,
        heroSlidesData
      ] = await Promise.all([
        fetchFeaturedProducts(),
        fetchCategories(),
        fetchHeroSlides()
      ]);

      setFeaturedProducts(productsData.content || productsData);
      setCategories(categoriesData.content || categoriesData);
      setHeroSlides(heroSlidesData);
      setStats({
        totalProducts: productsData.totalElements || productsData.length,
        totalCategories: categoriesData.totalElements || categoriesData.length,
        totalCustomers: 5420 // You can add this to your backend later
      });
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      // Fetch recent/featured products using your existing API
      const response = await fetchAllProducts(0, 8, "productId", "desc");
      return response;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return { content: [] };
    }
  };

  const fetchCategories = async () => {
    try {
      // Fetch categories using your backend endpoint
      const response = await fetch('http://localhost:8081/api/public/categories?pageNumber=0&pageSize=20&sortBy=categoryName&sortOrder=desc');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { content: [] };
    }
  };

  const fetchHeroSlides = async () => {
    try {
      // For now, create dynamic slides based on categories
      // You can later add a promotions API endpoint
      const slidesData = [
        {
          id: 1,
          title: "Welcome to Our Store",
          subtitle: "Discover Amazing Products",
          description: "Explore thousands of quality products",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
          buttonText: "Start Shopping",
          buttonLink: "/products"
        },
        {
          id: 2,
          title: "New Arrivals",
          subtitle: "Fresh & Trending",
          description: "Check out our latest products",
          image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop",
          buttonText: "Explore Now",
          buttonLink: "/products"
        },
        {
          id: 3,
          title: "Special Offers",
          subtitle: "Limited Time Only",
          description: "Don't miss out on great deals",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
          buttonText: "Shop Deals",
          buttonLink: "/products"
        }
      ];
      
      return slidesData;
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      return [];
    }
  };

  const setFallbackData = () => {
    setFeaturedProducts([]);
    setCategories([]);
    setHeroSlides([
      {
        id: 1,
        title: "Welcome to Our Store",
        subtitle: "Discover amazing products",
        description: "Quality products at great prices",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
        buttonText: "Shop Now",
        buttonLink: "/products"
      }
    ]);
    setStats({ totalProducts: 0, totalCategories: 0, totalCustomers: 0 });
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure transactions"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Round-the-clock assistance"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dynamic Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
              {heroSlides[currentSlide]?.title || "Welcome to Our Store"}
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              {heroSlides[currentSlide]?.subtitle || "Discover Amazing Products"}
            </p>
            <p className="text-lg mb-8 opacity-80">
              {heroSlides[currentSlide]?.description || "Quality products at great prices"}
            </p>
            <Link
              to={heroSlides[currentSlide]?.buttonLink || "/products"}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {heroSlides[currentSlide]?.buttonText || "Shop Now"}
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Dynamic Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">{stats.totalProducts.toLocaleString()}</h3>
              <p className="text-xl opacity-90">Products Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">{stats.totalCategories}</h3>
              <p className="text-xl opacity-90">Categories</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">{stats.totalCustomers.toLocaleString()}</h3>
              <p className="text-xl opacity-90">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our {categories.length} categories with over {stats.totalProducts} products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.categoryId}
                  to="/products"
                  onClick={() => handleCategoryClick(category.categoryId)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <div className="aspect-square">
                    <img
                      src={category.image || `https://picsum.photos/seed/${encodeURIComponent(category.categoryName)}/400/400`}
                      alt={category.categoryName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=${encodeURIComponent(category.categoryName)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold">{category.categoryName}</h3>
                      <p className="text-sm opacity-90">Browse now</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Latest products just for you
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 8).map((product) => (
                <Link
                  key={product.productId}
                  to={`/products/${product.productId}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80&auto=format&txt=${encodeURIComponent(product.productName)}`}
                      alt={product.productName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x400/6366F1/FFFFFF?text=${encodeURIComponent(product.productName)}`;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price?.toFixed(2) || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Personalized CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {user ? `Welcome back, ${user.firstName || 'Valued Customer'}!` : 'Ready to Start Shopping?'}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {user 
              ? 'Continue exploring our amazing products tailored just for you'
              : `Join ${stats.totalCustomers.toLocaleString()} satisfied customers and discover amazing deals`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Browse Products
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="inline-block border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 transform hover:scale-105"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;