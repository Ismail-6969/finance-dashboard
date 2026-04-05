import React, { useState } from 'react';

function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({
    name: '', amount: '', type: 'expense', category: '', date: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.amount || !form.date) return;
    onAdd({
      ...form,
      id: Date.now(),
      amount: Number(form.amount)
    });
    setForm({ name: '', amount: '', type: 'expense', category: '', date: '' });
  }

  return (
    <div className="section">
      <h3>Add Transaction (Admin)</h3>
      <form onSubmit={handleSubmit} className="add-form">
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Amount" type="number" value={form.amount}
          onChange={e => setForm({...form, amount: e.target.value})} />
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input placeholder="Category" value={form.category}
          onChange={e => setForm({...form, category: e.target.value})} />
        <input type="date" value={form.date}
          onChange={e => setForm({...form, date: e.target.value})} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;