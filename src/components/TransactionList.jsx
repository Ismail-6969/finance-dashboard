import React, { useState } from 'react';

function TransactionList({ transactions, search, setSearch, filterType, setFilterType, role }) {
  const [sortOrder, setSortOrder] = useState('desc');

  const sorted = [...transactions].sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="section">
      <h3>Transactions</h3>

      <div className="controls">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
          Sort: {sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      {sorted.length === 0 && (
        <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>No transactions found.</p>
            <p>Try changing your search or filter.</p>
        </div>
        )}

      <table className="txn-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.category}</td>
              <td>{t.date}</td>
              <td>
                <span className={`badge ${t.type}`}>{t.type}</span>
              </td>
              <td className={t.type === 'income' ? 'green' : 'red'}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;