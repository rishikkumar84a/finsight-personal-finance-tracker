import axios from 'axios';

// Create axios instance with environment-based URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getMe: () => api.get('/auth/me'),
};

// Transactions API calls
export const transactionsAPI = {
  getTransactions: (params?: {
    page?: number;
    limit?: number;
    month?: number;
    year?: number;
    category?: string;
    type?: string;
  }) => api.get('/transactions', { params }),
  
  createTransaction: (transactionData: {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date?: string;
  }) => api.post('/transactions', transactionData),
  
  updateTransaction: (id: string, updates: Partial<{
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
  }>) => api.put(`/transactions/${id}`, updates),
  
  deleteTransaction: (id: string) => api.delete(`/transactions/${id}`),
  
  getTransactionStats: (params?: { month?: number; year?: number }) =>
    api.get('/transactions/stats', { params }),
};

// Budgets API calls
export const budgetsAPI = {
  getBudgets: (params?: { month?: number; year?: number }) =>
    api.get('/budgets', { params }),
  
  createBudget: (budgetData: {
    category: string;
    amount: number;
    month: number;
    year: number;
  }) => api.post('/budgets', budgetData),
  
  updateBudget: (id: string, updates: Partial<{
    category: string;
    amount: number;
    month: number;
    year: number;
  }>) => api.put(`/budgets/${id}`, updates),
  
  deleteBudget: (id: string) => api.delete(`/budgets/${id}`),
};

export default api;
