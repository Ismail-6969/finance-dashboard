import React from 'react';

function Insights({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0];

  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  const totalIncome  = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
  const savingsRate  = ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1);

  return (
    <div className="section">
      <h3>Insights</h3>
      <div className="insights-grid">
        <div className="insight-card">
          <p className="insight-label">Highest Spending Category</p>
          <p className="insight-value">{topCategory ? topCategory[0] : '—'}</p>
          <p className="insight-sub">₹{topCategory ? topCategory[1].toLocaleString() : 0}</p>
        </div>
        <div className="insight-card">
          <p className="insight-label">Savings Rate</p>
          <p className="insight-value">{savingsRate}%</p>
          <p className="insight-sub">of total income saved</p>
        </div>
        <div className="insight-card">
          <p className="insight-label">Total Transactions</p>
          <p className="insight-value">{transactions.length}</p>
          <p className="insight-sub">{expenses.length} expenses, {transactions.length - expenses.length} income</p>
        </div>
      </div>
    </div>
  );
}

export default Insights;