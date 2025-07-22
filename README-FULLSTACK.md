# FinSight Full-Stack Personal Finance Tracker

## 🚀 Project Overview

FinSight has been successfully transformed from a static React application into a full-stack, dynamic web application with user authentication and persistent data storage.

### ✨ Key Features

- **User Authentication**: Secure JWT-based login and registration
- **Personal Data**: Each user has their own isolated financial data
- **Real-time Updates**: All transactions and budgets are saved to MongoDB
- **Enhanced Security**: Password hashing, input validation, and protected routes
- **Responsive UI**: Beautiful, modern interface with shadcn/ui components

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- **Authentication API**: JWT-based user registration and login
- **Transactions API**: Full CRUD operations for financial transactions
- **Budgets API**: Budget management with monthly/yearly filtering
- **Database**: MongoDB with Mongoose ODM
- **Security**: bcrypt for password hashing, JWT for authentication

### Frontend (React + TypeScript + Vite)
- **Authentication Context**: Global state management for user sessions
- **API Integration**: Axios with interceptors for seamless API communication
- **Protected Routes**: Route guards for authenticated-only content
- **Custom Hooks**: useTransactions and useBudgets for data management
- **Modern UI**: shadcn/ui components with Tailwind CSS

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishikkumar84a/finsight-personal-finance-tracker.git
   cd finsight-personal-finance-tracker
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/finsight
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

6. **Start the Application**
   
   **Option 1: Use the start script (Windows)**
   ```bash
   ./start-dev.bat
   ```
   
   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Start Backend
   cd server
   npm run dev
   
   # Terminal 2 - Start Frontend
   cd ..
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5001

### First Run

1. Visit http://localhost:8080
2. Click "Create Account" to register a new user
3. Fill in your username, email, and password
4. Start tracking your finances!

## 📊 New Features Added

### 1. **User Authentication**
- Secure registration and login system
- JWT-based authentication
- Password encryption with bcrypt
- User session management

### 2. **Persistent Data Storage**
- MongoDB database integration
- User-specific data isolation
- Transaction history preservation
- Budget tracking across sessions

### 3. **Enhanced API**
- RESTful API design
- Comprehensive error handling
- Input validation and sanitization
- Pagination and filtering support

### 4. **Improved User Experience**
- Loading states and error handling
- Toast notifications for user feedback
- Responsive design for all devices
- User profile management

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure, stateless authentication
- **Input Validation**: express-validator for API endpoints
- **CORS Protection**: Configured for frontend domain
- **Error Handling**: Comprehensive error responses
- **Route Protection**: Authentication middleware

## 🗃️ Database Schema

### Users
```javascript
{
  username: String (unique, required)
  email: String (unique, required)  
  password: String (hashed, required)
  createdAt: Date
  updatedAt: Date
}
```

### Transactions
```javascript
{
  user: ObjectId (ref: User, required)
  description: String (required)
  amount: Number (required, min: 0.01)
  type: String (enum: ['income', 'expense'])
  category: String (predefined categories)
  date: Date
  createdAt: Date
  updatedAt: Date
}
```

### Budgets
```javascript
{
  user: ObjectId (ref: User, required)
  category: String (required)
  amount: Number (required, min: 0)
  month: Number (0-11)
  year: Number
  createdAt: Date
  updatedAt: Date
}
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Transactions
- `GET /api/transactions` - Get user's transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats` - Get transaction statistics

### Budgets
- `GET /api/budgets` - Get user's budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

## 📱 Frontend Features

### Routing
- `/login` - Login page
- `/signup` - Registration page
- `/` - Dashboard (protected route)

### State Management
- **AuthContext**: User authentication state
- **Custom Hooks**: Data fetching and management
- **Local Storage**: JWT token persistence

### Components
- **PrivateRoute**: Route protection wrapper
- **LoginPage**: User authentication form
- **SignupPage**: User registration form
- **Enhanced Dashboard**: Real-time data display

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud MongoDB
2. Update environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Update API base URL for production
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or similar platforms

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Frontend**: Form validation, API error handling
- **Backend**: Input validation, database error handling
- **Authentication**: Token validation, protected routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎉 What's Next?

The application now has a solid foundation for further enhancements:

- **Analytics Dashboard**: Advanced spending insights
- **Export Features**: PDF reports, CSV exports  
- **Mobile App**: React Native companion app
- **Integrations**: Bank API connections, receipt scanning
- **Social Features**: Expense sharing, family budgets

---

**FinSight** - Your personal finance companion, now with the power of full-stack architecture! 💰✨
