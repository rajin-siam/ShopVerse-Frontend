rajin-siam: Read this full project and create a Readme.md file for this

Workspace: Collecting workspace information# ShopVerse - E-Commerce Frontend

A modern e-commerce frontend application built with React and Vite, offering a complete shopping experience with product browsing, reviews, cart management, checkout, and user profiles.

## Features

- **User Authentication**
  - Login/Signup with email
  - Google OAuth integration
  - Protected routes for authenticated users

- **Product Management**
  - Browse products with filtering and sorting
  - Detailed product views with specifications
  - Product reviews and ratings
  - Add products to wishlist

- **Shopping Experience**
  - Shopping cart management
  - Multi-step checkout process
  - Order confirmation and tracking

- **User Profile**
  - View and edit user information
  - Manage wishlist
  - Order history

- **Admin Dashboard**
  - Product management
  - Category management
  - Order management
  - User management

## Tech Stack

- **Frontend Framework**: React with Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast
- **Authentication**: JWT with Google OAuth integration

## Project Structure

The project follows a feature-based architecture:

```
src/
├── assets/             # Static assets
├── common/             # Shared components, contexts, and utilities
│   ├── components/     # Layout and UI components
│   ├── constants/      # Configuration and constants
│   ├── contexts/       # Global state management
│   └── hooks/          # Custom React hooks
├── features/           # Feature modules
│   ├── admin/          # Admin dashboard features
│   ├── auth/           # Authentication-related features
│   ├── cart/           # Shopping cart features
│   ├── checkout/       # Checkout process
│   ├── home/           # Homepage components
│   ├── products/       # Product browsing and details
│   └── user/           # User profile features
├── pages/              # Page components
└── shared/             # Shared utilities
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopverse-frontend.git
   cd shopverse-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with your configuration:
   ```
   VITE_API_BASE_URL=https://your-backend-api.com/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`

## Key Components

### Product Reviews

The application includes a comprehensive review system allowing users to:
- View all product reviews
- Submit their own reviews with ratings
- Edit or delete their reviews
- Sort reviews by date or rating

### Checkout Process

The checkout process includes multiple steps:
1. Shipping address information
2. Payment method selection
3. Order review and confirmation

### User Wishlist

Users can add products to their wishlist for later consideration, with the ability to:
- View all wishlisted items
- Remove items from wishlist
- Easily navigate to product details

## API Integration

The application integrates with a backend API for all data operations. The base URL is configured through the environment variable `VITE_API_BASE_URL`.

## Responsive Design

The application is fully responsive with:
- Mobile-friendly navigation
- Responsive layouts for all screens
- Tailwind's utility classes for responsive design

## License

This project is licensed under the MIT License - see the LICENSE file for details.