import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Budget must belong to a user']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: {
      values: [
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
      ],
      message: 'Please provide a valid category'
    }
  },
  amount: {
    type: Number,
    required: [true, 'Please provide a budget amount'],
    min: [0, 'Budget amount must be greater than or equal to 0']
  },
  month: {
    type: Number,
    required: [true, 'Please provide a month'],
    min: [0, 'Month must be between 0 and 11'],
    max: [11, 'Month must be between 0 and 11']
  },
  year: {
    type: Number,
    required: [true, 'Please provide a year'],
    min: [2020, 'Year must be 2020 or later']
  }
}, {
  timestamps: true
});

// Compound index to ensure unique budget per category per month per user
budgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
