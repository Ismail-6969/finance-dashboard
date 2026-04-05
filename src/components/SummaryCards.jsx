import React from 'react';

function SummaryCards({ balance, income, expense }) {
  return (
    <div className="cards-grid">
      <div className="card">
        <p className="card-label">Total Balance</p>
        <h2 className="card-amount">₹{balance.toLocaleString()}</h2>
      </div>
      <div className="card income">
        <p className="card-label">Total Income</p>
        <h2 className="card-amount">₹{income.toLocaleString()}</h2>
      </div>
      <div className="card expense">
        <p className="card-label">Total Expenses</p>
        <h2 className="card-amount">₹{expense.toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;