// components/home/HeroSection.jsx - Simple Hero
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ user }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {user ? `Welcome back, ${user.firstName}!` : 'Welcome to Our Store'}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing products at great prices
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;