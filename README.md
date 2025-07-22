
# FinSight - Full-Stack Personal Finance Tracker

A modern, comprehensive personal finance tracking application built with **React, TypeScript, Node.js, Express, and MongoDB**. FinSight is now a complete full-stack application with user authentication, persistent data storage, and secure API endpoints. Track your expenses, set budgets, and gain insights into your spending patterns with beautiful data visualizations.

## 🚀 **Full-Stack Architecture**
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express.js + JWT Authentication
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (Frontend) + Railway (Backend) + MongoDB Atlas

## ✨ Features

### 🔐 **User Authentication & Security**
- ✅ Secure user registration and login system
- ✅ JWT-based authentication with 30-day token expiration
- ✅ Password hashing with bcrypt
- ✅ Protected routes and API endpoints
- ✅ User session management with automatic logout

### 📊 Stage 1 - Transaction Management
- ✅ Add, edit, and delete transactions with full validation
- ✅ Categorize transactions (Food & Dining, Transportation, Shopping, etc.)
- ✅ Support for both expenses and income
- ✅ Monthly expense visualization with interactive bar charts
- ✅ **Persistent data storage** - All transactions saved to MongoDB
- ✅ User-specific transaction isolation

### 🎯 Stage 2 - Categories & Dashboard
- ✅ Predefined spending categories with color coding
- ✅ Interactive pie charts for category-wise expense breakdown
- ✅ **Real-time dashboard** featuring:
  - Total monthly expenses and income from database
  - Budget vs actual spending with live updates
  - Category-wise spending analysis
  - Recent transactions overview with user-specific data

### 💰 Stage 3 - Advanced Budgeting & Insights
- ✅ Set and manage monthly budgets per category with database persistence
- ✅ Real-time budget vs actual comparison with progress bars
- ✅ **Smart spending insights** including:
  - Over-budget alerts with visual indicators
  - Top spending category identification
  - Daily spending averages calculated from user's data
  - Cross-device synchronization through cloud storage
  - Budget surplus/deficit tracking
- ✅ AI-powered financial recommendations

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **State Management**: React hooks with local state
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
## 🚀 **Getting Started**

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finsight-personal-finance-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment (.env in server directory)
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Frontend environment (.env.development in root)
   VITE_API_URL=http://localhost:5001/api
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Start backend server
   cd server
   npm run dev

   # Terminal 2: Start frontend server
   npm run dev
   ```

6. **Open your browser**
   - **Frontend**: `http://localhost:8080`
   - **Backend API**: `http://localhost:5001/api`

### 🌐 **Production Deployment**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Build for Production

```bash
# Build frontend
npm run build

# The built files will be available in the `dist` directory
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   ├── CategoryChart.tsx
│   ├── MonthlyChart.tsx
│   ├── BudgetManager.tsx
│   ├── DashboardStats.tsx
│   ├── RecentTransactions.tsx
│   └── BudgetProgress.tsx
├── data/               # Mock data and constants
│   └── mockData.ts
├── types/              # TypeScript type definitions
│   └── finance.ts
├── pages/              # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🎨 Design Features

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI**: Clean, card-based layout with subtle gradients and shadows
- **Interactive Charts**: Beautiful data visualizations with hover effects and tooltips
- **Smooth Animations**: Micro-interactions and transitions for enhanced UX
- **Color-Coded Categories**: Visual distinction between different expense categories
- **Glass Morphism**: Modern backdrop blur effects for depth
- **Accessibility**: Proper semantic HTML and keyboard navigation support

## 📊 Features in Detail

### Transaction Management
- Comprehensive form validation
- Real-time search and filtering
- Category and type-based filtering
- Inline editing capabilities
- Bulk operations support

### Budget Tracking
- Visual progress indicators
- Over-budget warnings
- Category-wise budget allocation
- Remaining budget calculations
- Historical budget performance

### Analytics & Insights
- Monthly spending trends
- Category distribution analysis
- Budget vs actual comparisons
- Spending pattern identification
- Automated financial recommendations

## 🔧 Configuration

The application uses a design system defined in `src/index.css` and `tailwind.config.ts`. We can customize:

- Color schemes and gradients
- Typography and spacing
- Component styling
- Animation preferences

## 🔮 Future Enhancements

- **Backend Integration**: Connect to a real database (PostgreSQL with Prisma)
- **User Authentication**: Multi-user support with secure login
- **Data Export**: PDF reports and CSV exports
- **Mobile App**: React Native companion app
- **Advanced Analytics**: Machine learning-powered insights
- **Bank Integration**: Automatic transaction import
- **Bill Reminders**: Automated payment notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Recharts](https://recharts.org/) for the excellent charting library
- [Lucide](https://lucide.dev/) for the comprehensive icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling approach

---

**FinSight** - Take control of your finances with beautiful, intelligent tracking. 💰✨
