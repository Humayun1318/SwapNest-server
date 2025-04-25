# 🏠 SwapNest - Secondhand Marketplace Web Application

**SwapNest** is a full-featured secondhand marketplace platform that empowers users to **buy, sell, and manage used items** with ease. Whether you're looking to declutter your home or score great deals, SwapNest provides a seamless, secure, and user-friendly environment for all.

---

## 🚀 Key Features

- 🔐 **Secure Authentication**  
  Custom login system with JWT and bcrypt password hashing.

- 📦 **Post, Update, and Manage Listings**  
  Users can add detailed listings with images, price, condition, and more.

- 💬 **Buyer-Seller Messaging (Optional)**  
  Seamless communication between buyers and sellers.

- 🛍️ **Track Sales and Purchases**  
  View and manage your purchase and sales history.

- 🌟 **Wishlist Feature**  
  Save items to revisit later.

- 🔍 **Advanced Search & Filters**  
  Find what you need with filtering by category, price, condition, and location.

- 🧑‍💼 **Admin Panel (Optional)**  
  Moderate listings, ban/unban users, and manage content.

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)

### Steps

1. Clone the repository:

```sh
git clone https://github.com/Humayun1318/SwapNest-server.git
cd SwapNest-server
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and configure the required variables:

```env
NODE_ENV= development
PORT=5000
DATABASE_URL=mongodb+srv://runtimenation:runtaimenation12345@cluster0.2cqx3gs.mongodb.net/
# DATABASE_URL=mongodb://localhost:27017/swapnest
BCRYPT_SALT_ROUNDS=8
JWT_ACCESS_SECRET=473d601c7348ebc5ac129f5a47c2a64b8020db26dbf0f2e6e81841f3f8af4f409638ddd03969fbe791bfa1c3d44934821ab32cb56beb852b988a391c039a0e97
JWT_REFRESH_SECRET=016e6b54e7be2b04c423775746f85763aed383c0f9783a1b1b9d5924b6d029694ed782a0f28804838e7b1184056d796993e090de0cdaf44b09815c7ac4917f41
JWT_ACCESS_SECRET_EXPIRES_IN=5h
JWT_REFRESH_SECRET_EXPIRES_IN=30d
```

4. Start the development server:

```sh
npm run start:dev
```

## API Endpoints

### Authentication

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | User login          |

### Users

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/v1/users`         | Get all users (Admin)      |
| GET    | `/api/v1/users/:id`     | Get a user by ID           |
| PATCH  | `/api/v1/users/:id`     | Update user information    |
| PATCH  | `/api/v1/users/:id/ban` | Update user status (Admin) |
| DELETE | `/api/v1/users/:id`     | Delete Own ID              |

### Listings

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/v1/listings`     | Get all products    |
| GET    | `/api/v1/listings/:id` | Get a listing by ID |
| POST   | `/api/v1/listings`     | Add a new listing   |
| PATCH  | `/api/v1/listings/:id` | Update a listing    |
| DELETE | `/api/v1/listings/:id` | Delete a listing    |

### Transactions

| Method | Endpoint                                 | Description                               |
| ------ | ---------------------------------------- | ----------------------------------------- |
| PATCH  | `/api/v1/transactions/:id`               | Update an transaction status ID           |
| POST   | `/api/v1/transactions`                   | Create a new transaction                  |
| GET    | `/api/v1/transactions/purchases/:userId` | Get all purchase history by specific user |
| GET    | `/api/v1/transactions/sales/:userId`     | Get all sales history by specific user    |

## Folder Structure

```
SwapNest-server/
├── dist/                                             # Compiled Code
│   ├── app/
│   ├── app.js
│   └── server.js
├── src/                                              # Source Code
│   ├── app/                                          # Main Application Logic
│   │   ├── config/                                   # Configuration Files
│   │   ├── builder/                                  # Query Builders
│   │   ├── errors/                                   # Error Handling
│   │   ├── interface/                                # TypeScript Interfaces
│   │   ├── middleware/                               # Middleware Functions
│   │   ├── modules/                                  # Modularized Features
│   │   ├── routes/                                   # API Routes
│   │   ├── types/                                    # Type Definitions
│   │   └── utils/                                    # Utility Functions
│   ├── app.ts                                        # Application Entry Point
│   └── server.ts                                     # Main Server File
├── .gitignore                                        # Files/Folders to Ignore in Git
├── .prettierignore                                   # Files/Folders to Ignore in Prettier
├── .prettierrc                                       # Prettier Configuration
├── README.md                                         # Documentation File
├── .eslint.config.mjs                                # ESLint Configuration
├── package-lock.json                                 # Lock File for Dependencies
├── package.json                                      # Project Metadata and Dependencies
├── tsconfig.json                                     # TypeScript Configuration
└── vercel.json                                       # Vercel Deployment Configuration
```

SwapNest is built with clean code principles, modular architecture, and scalable components to provide a modern, community-driven e-commerce experience focused on sustainability.
