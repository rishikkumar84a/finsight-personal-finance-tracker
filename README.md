
# FinSight - Personal Finance Tracker

A modern, comprehensive personal finance tracking application built with React, TypeScript, and Tailwind CSS. FinSight helps you manage your expenses, set budgets, and gain insights into your spending patterns with beautiful data visualizations. The Project is completed all 3 stages which are also mentioned below.

## ✨ Features

### 📊 Stage 1 - Transaction Management
- ✅ Add, edit, and delete transactions with full validation
- ✅ Categorize transactions (Food & Dining, Transportation, Shopping, etc.)
- ✅ Support for both expenses and income
- ✅ Monthly expense visualization with interactive bar charts
- ✅ Form validation for all required fields and data types

### 🎯 Stage 2 - Categories & Dashboard
- ✅ Predefined spending categories with color coding
- ✅ Interactive pie charts for category-wise expense breakdown
- ✅ Comprehensive dashboard featuring:
  - Total monthly expenses and income
  - Budget vs actual spending
  - Category-wise spending analysis
  - Recent transactions overview

### 💰 Stage 3 - Advanced Budgeting & Insights
- ✅ Set and manage monthly budgets per category
- ✅ Real-time budget vs actual comparison with progress bars
- ✅ Smart spending insights including:
  - Over-budget alerts with visual indicators
  - Top spending category identification
  - Daily spending averages
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
   ```bash
   git clone <repository-url>
   cd finsight
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

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
