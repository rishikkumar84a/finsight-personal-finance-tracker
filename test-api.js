import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

async function testAPI() {
  try {
    console.log('🚀 Testing FinSight Full-Stack API...\n');

    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', health.data.message);

    // Test 2: Register User
    console.log('\n2. Testing User Registration...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      username: 'demo_user',
      email: 'demo@example.com', 
      password: 'demo123456'
    });
    console.log('✅ User Registered:', registerResponse.data.data.user.username);
    const token = registerResponse.data.token;

    // Test 3: Add Income Transaction
    console.log('\n3. Testing Transaction Creation...');
    const incomeTransaction = await axios.post(`${API_BASE}/transactions`, {
      description: 'Salary Payment',
      amount: 65000,
      type: 'income',
      category: 'Other'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Income Added:', `₹${incomeTransaction.data.data.transaction.amount}`);

    // Test 4: Add Expense Transaction  
    const expenseTransaction = await axios.post(`${API_BASE}/transactions`, {
      description: 'Grocery Shopping',
      amount: 3500,
      type: 'expense',
      category: 'Food & Dining'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Expense Added:', `₹${expenseTransaction.data.data.transaction.amount}`);

    // Test 5: Get All Transactions
    console.log('\n4. Testing Transaction Retrieval...');
    const transactions = await axios.get(`${API_BASE}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Total Transactions:', transactions.data.count);
    
    // Test 6: Create Budget
    console.log('\n5. Testing Budget Creation...');
    const budget = await axios.post(`${API_BASE}/budgets`, {
      category: 'Food & Dining',
      amount: 15000,
      month: 6, // July (0-indexed)
      year: 2025
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Budget Created:', `₹${budget.data.data.budget.amount} for ${budget.data.data.budget.category}`);

    // Test 7: Get Transaction Stats
    console.log('\n6. Testing Transaction Statistics...');
    const stats = await axios.get(`${API_BASE}/transactions/stats?month=6&year=2025`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Monthly Stats:');
    console.log(`   Income: ₹${stats.data.data.monthly.income}`);
    console.log(`   Expenses: ₹${stats.data.data.monthly.expenses}`);
    console.log(`   Balance: ₹${stats.data.data.monthly.balance}`);

    console.log('\n🎉 ALL TESTS PASSED! Full-stack application is working perfectly!');
    console.log('\n📱 Frontend Login Credentials:');
    console.log('   Email: demo@example.com');
    console.log('   Password: demo123456');

  } catch (error) {
    console.error('❌ Test Failed:', error.response?.data?.message || error.message);
  }
}

testAPI();
