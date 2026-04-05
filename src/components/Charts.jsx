import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

import { CHART_COLORS } from '../data/constants';

function Charts({ transactions }) {
  const lineData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(d => d.date === t.date);
      if (existing) existing.amount += t.amount;
      else acc.push({ date: t.date, amount: t.amount });
      return acc;
    }, [])
    .sort((a, b) => a.date.localeCompare(b.date));

  const pieData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(d => d.name === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ name: t.category, value: t.amount });
      return acc;
    }, []);

  return (
    <div className="charts-grid">
      <div className="chart-box">
        <h3>Spending Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => '₹' + v.toLocaleString()} />
            <Line type="monotone" dataKey="amount" stroke="#378add" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]}/>
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={v => '₹' + v.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;