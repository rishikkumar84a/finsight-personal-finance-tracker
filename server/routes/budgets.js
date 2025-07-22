import express from 'express';
import { body } from 'express-validator';
import { 
  getBudgets, 
  createBudget, 
  updateBudget, 
  deleteBudget 
} from '../controllers/budgets.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/budgets
// @desc    Get all budgets for logged in user
// @access  Private
router.get('/', getBudgets);

// @route   POST /api/budgets
// @desc    Create a new budget
// @access  Private
router.post('/', [
  body('category')
    .isIn([
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment', 
      'Bills & Utilities',
      'Healthcare',
      'Travel',
      'Education',
      'Personal Care',
      'Other'
    ])
    .withMessage('Please provide a valid category'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be greater than or equal to 0'),
  body('month')
    .isInt({ min: 0, max: 11 })
    .withMessage('Month must be between 0 and 11'),
  body('year')
    .isInt({ min: 2020 })
    .withMessage('Year must be 2020 or later')
], createBudget);

// @route   PUT /api/budgets/:id
// @desc    Update a budget
// @access  Private
router.put('/:id', [
  body('category')
    .optional()
    .isIn([
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities', 
      'Healthcare',
      'Travel',
      'Education',
      'Personal Care',
      'Other'
    ])
    .withMessage('Please provide a valid category'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount must be greater than or equal to 0'),
  body('month')
    .optional()
    .isInt({ min: 0, max: 11 })
    .withMessage('Month must be between 0 and 11'),
  body('year')
    .optional()
    .isInt({ min: 2020 })
    .withMessage('Year must be 2020 or later')
], updateBudget);

// @route   DELETE /api/budgets/:id
// @desc    Delete a budget
// @access  Private
router.delete('/:id', deleteBudget);

export default router;
