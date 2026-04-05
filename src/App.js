import React, { useState, useEffect } from 'react';
import { useFinance } from './hooks/useFinance';
import SummaryCards from './components/SummaryCards';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import Insights from './components/Insights';
import AddTransaction from './components/AddTransaction';
import { ROLES } from './data/constants';
import './App.css';

function App() {
  const {
    transactions,
    role, setRole,
    search, setSearch,
    filterType, setFilterType,
    toast,
    totalIncome,
    totalExpense,
    balance,
    filtered,
    addTransaction,
    exportCSV,    
    exportJSON,   
  } = useFinance();

  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <header className="topbar">
        <h1>💰 Finance Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

                                      
          <button className="export-btn" onClick={exportCSV}>⬇ CSV</button>
          <button className="export-btn" onClick={exportJSON}>⬇ JSON</button>

          <div className="role-switcher">
            <span>Role:</span>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value={ROLES.VIEWER}>Viewer</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>
          </div>
        </div>
      </header>

      <main className="main">
        <SummaryCards balance={balance} income={totalIncome} expense={totalExpense} />
        <Charts transactions={transactions} />

        {role === ROLES.ADMIN && (
          <AddTransaction onAdd={addTransaction} />
        )}

        <TransactionList
          transactions={filtered}
          search={search}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
          role={role}
        />

        <Insights transactions={transactions} />
      </main>

      {toast && (
        <div className="toast">✅ Transaction added successfully!</div>
      )}
    </div>
  );
}

export default App;