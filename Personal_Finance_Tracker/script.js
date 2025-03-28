// script.js

// Get DOM elements
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const transactionList = document.getElementById('transactionList');
const totalExpenses = document.getElementById('totalExpenses');
const totalSavings = document.getElementById('totalSavings');
const expenseForm = document.getElementById('expenseForm');

// Load data from Local Storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Initial totals
let expensesTotal = 0;
let savingsTotal = 0;

// Load data on page load
window.onload = () => {
    renderTransactions();
    updateTotals();
    renderChart();
};

// Add a new transaction
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    // Create transaction object
    const transaction = {
        amount,
        category,
        date,
    };

    // Save transaction to localStorage
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Clear input fields
    amountInput.value = '';
    dateInput.value = '';

    // Render updated transactions and totals
    renderTransactions();
    updateTotals();
    renderChart();
});

// Render transactions list
function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.category} - $${transaction.amount.toFixed(2)} on ${transaction.date}`;
        transactionList.appendChild(li);
    });
}

// Update total expenses and savings
function updateTotals() {
    expensesTotal = 0;
    savingsTotal = 0;

    transactions.forEach(transaction => {
        if (transaction.category === 'Savings') {
            savingsTotal += transaction.amount;
        } else {
            expensesTotal += transaction.amount;
        }
    });

    totalExpenses.textContent = expensesTotal.toFixed(2);
    totalSavings.textContent = savingsTotal.toFixed(2);
}

// Render pie chart
function renderChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    const categories = ['Food', 'Rent', 'Entertainment', 'Savings'];
    const amounts = [0, 0, 0, 0];

    transactions.forEach(transaction => {
        const categoryIndex = categories.indexOf(transaction.category);
        if (categoryIndex !== -1) {
            amounts[categoryIndex] += transaction.amount;
        }
    });

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets
