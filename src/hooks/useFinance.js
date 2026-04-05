import { useState, useEffect } from 'react'; 
import { transactions as initialData } from '../data/transactions';


export function useFinance() {

    const [transactions, setTransactions] = useState(initialData);
  
  const [role, setRole]                 = useState('viewer');
  const [search, setSearch]             = useState('');
  const [filterType, setFilterType]     = useState('all');
  const [toast, setToast]               = useState(false);

  
  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  
  const filtered = transactions
    .filter(t => filterType === 'all' || t.type === filterType)
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  
  function addTransaction(newTxn) {
    setTransactions(prev => [newTxn, ...prev]);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }
  

  
  function exportCSV() {
    const headers = ['Name', 'Category', 'Date', 'Type', 'Amount'];
    const rows = transactions.map(t =>
      [t.name, t.category, t.date, t.type, t.amount].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    downloadFile(csv, 'transactions.csv', 'text/csv');
  }


  function exportJSON() {
    const json = JSON.stringify(transactions, null, 2);
    downloadFile(json, 'transactions.json', 'application/json');
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
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
  };
}