# 🍽️ Platora — Food & Grocery Ordering Web Application

A full-stack **MERN (MongoDB, Express.js, React, Node.js)** web application for seamless online food delivery and quick-commerce grocery ordering. Platora delivers a modern, lightning-fast, and responsive user experience inspired by top-tier food delivery platforms.

---

## 🚀 Features

### 🍔 Food Ordering Experience
- **Explore Diverse Cuisines & Dishes**: Browse categorized menus (Starters, Main Course, Biryanis, Pizzas, Desserts, Beverages, etc.) with real-time search and filter capabilities.
- **Top Brands & Restaurants**: Discover popular food chains and local eateries with curated menus and custom banners.
- **Interactive Cart & Quantity Controls**: Seamlessly add, remove, and modify item quantities with instant subtotal calculations.

### ⚡ Instamart / Quick Grocery Delivery
- **Curated Grocery Catalog**: Quick-commerce categories including Fresh Vegetables, Fresh Fruits, Dairy, Bread & Eggs, Munchies & Snacks, Cold Drinks & Juices, Sweet Cravings, Atta, Rice & Dals, and Meat & Seafood.
- **Instant Delivery Promos**: Dedicated quick-delivery badges, dynamic discounts, and stock availability tags.

### 💳 Checkout & Order Tracking
- **Multi-step Checkout & Payment**: Support for multiple payment methods (UPI, Cards, Net Banking, Cash on Delivery).
- **Coupons & Promo Codes**: Apply discount coupons with real-time bill breakdown updates.
- **Live Order Tracking**: Visual progress tracker for placed orders (Order Placed ➔ Food Processing ➔ Out for Delivery ➔ Delivered).
- **Order History**: View past orders with full item details, delivery status, and re-order shortcuts.

### 👤 User Management & Security
- **Authentication**: Secure JWT-based user registration, login, and password reset flows with hashed passwords via `bcryptjs`.
- **Profile Dashboard**: Manage personal info, saved delivery addresses, favorites, and view account activity.
- **Reviews & Ratings**: Rate and review ordered food items and explore community ratings.

### 🎨 Design & Experience
- **Responsive & Mobile-First**: Optimized layouts with fixed bottom navigation and floating quick-cart for mobile devices.
- **Smooth Animations**: Powered by `framer-motion` for fluid page transitions and interactive micro-animations.
- **Modern Iconography**: Clean, lightweight icons via `lucide-react`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: Vanilla CSS (Custom responsive design system)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Environment Management**: [dotenv](https://github.com/motdotla/dotenv)
- **CORS Support**: [cors](https://github.com/expressjs/cors)

---

## 📂 Project Structure

```text
platora-food-ordering-webapp/
└── mern-platora/
    ├── backend/
    │   ├── config/             # Database connection setup (Mongoose)
    │   ├── controllers/        # Request handlers (auth, order, user, coupon, review)
    │   ├── middleware/         # Auth verification & error handling middleware
    │   ├── models/             # Mongoose schemas (User, Order, Coupon, Review, etc.)
    │   ├── routes/             # Express API routes
    │   ├── .env                # Backend environment configuration
    │   ├── package.json        # Backend dependencies & scripts
    │   └── server.js           # Express application entry point
    │
    ├── frontend/
    │   ├── public/             # Static public assets
    │   ├── src/
    │   │   ├── assets/         # Food & brand images, logos, icons
    │   │   ├── components/     # Reusable UI components (Navbar, Footer, ProductCard, etc.)
    │   │   ├── context/        # Context providers (AuthContext, CartContext)
    │   │   ├── pages/          # Application views (Home, Menu, Grocery, Cart, Profile, etc.)
    │   │   ├── App.jsx         # App routes and layout configuration
    │   │   ├── index.css       # Global styles & design variables
    │   │   └── main.jsx        # React root entry point
    │   ├── package.json        # Frontend dependencies & scripts
    │   └── vite.config.js      # Vite configuration
    │
    ├── package.json            # Root workspace config with concurrent run scripts
    └── README.md               # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v18.x or later)
- **npm** (v9.x or later)
- **MongoDB** (Local instance running on `mongodb://localhost:27017` or MongoDB Atlas URI)

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Srikanth-Tirumani/platora-food-ordering-webapp.git
   cd platora-food-ordering-webapp/mern-platora
   ```

2. **Install Root, Backend, and Frontend Dependencies**:
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   cd ..
   ```

---

### Environment Variables Setup

Create a `.env` file in the `mern-platora/backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/platora
JWT_SECRET=your_super_secret_jwt_key
```

---

### Running the Application

You can start both the **Backend API** and the **Frontend Vite Dev Server** simultaneously from `mern-platora/` using a single command:

```bash
cd mern-platora
npm run dev
```

This runs:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

#### Run Services Separately:

- **Run Backend only**:
  ```bash
  npm run server
  ```
- **Run Frontend only**:
  ```bash
  npm run client
  ```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in user and receive JWT | No |
| `GET` | `/api/users/profile` | Get current user's profile | Yes |
| `PUT` | `/api/users/profile` | Update profile information | Yes |
| `POST` | `/api/orders` | Create a new order | Yes |
| `GET` | `/api/orders/my-orders` | Fetch orders placed by authenticated user | Yes |
| `GET` | `/api/orders/:id` | Get order details by ID | Yes |
| `GET` | `/api/coupons` | Get all active coupons and discounts | No |
| `POST` | `/api/coupons/apply` | Validate and apply promo code | Yes |
| `GET` | `/api/reviews/:itemId` | Get customer reviews for an item | No |
| `POST` | `/api/reviews` | Submit a review for a dish | Yes |

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Developed with ❤️ by **Srikanth Tirumani** ([@Srikanth-Tirumani](https://github.com/Srikanth-Tirumani))
