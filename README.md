# 💰 Finance Dashboard

A clean and interactive finance dashboard built with React.js that allows users to track and understand their financial activity.

## 🚀 How to Run

1. Clone or download this project
2. Open terminal in the project folder
3. Install dependencies:

4. Start the app:

5. Open your browser at `http://localhost:3000`

## ✨ Features

### 1. Dashboard Overview
- Summary cards showing Total Balance, Income, and Expenses
- Line chart showing spending trend over time
- Pie chart showing spending breakdown by category

### 2. Transactions Section
- List of all transactions with name, date, amount, category, and type
- Search transactions by name
- Filter by type (All / Income / Expense)
- Sort by newest or oldest first

### 3. Role Based UI
- **Viewer** — can only see data, no editing allowed
- **Admin** — can add new transactions using the form
- Switch roles using the dropdown in the top bar

### 4. Insights Section
- Highest spending category
- Savings rate percentage
- Total transaction count

### 5. Optional Enhancements
- 🌙 Dark Mode — toggle between light and dark theme
- 💾 Data Persistence — transactions saved in localStorage, survives page refresh
- ⬇ Export — download transactions as CSV or JSON file
- ✨ Animations — smooth fade-in effects on cards and sections
- 📱 Responsive — works on mobile and desktop screens

## 🗂 Project Structure

src/
components/
SummaryCards.jsx      — Balance, Income, Expense cards
Charts.jsx            — Line chart and Pie chart
TransactionList.jsx   — Table with search, filter, sort
Insights.jsx          — Key financial insights
AddTransaction.jsx    — Form to add new transaction (Admin only)
data/
transactions.js       — Sample transaction data
constants.js          — App-wide constants and config
hooks/
useFinance.js         — Custom hook for all app logic
App.js                  — Main component
App.css                 — All styles including dark mode

## 🛠 Tech Stack

- **React.js** — Frontend framework
- **Recharts** — Charts and data visualization
- **CSS** — Styling and responsive design
- **localStorage** — Data persistence

## 📦 State Management

All application state is managed using React's built-in `useState` hook inside a custom hook `useFinance.js`. This keeps `App.js` clean and separates UI from logic.

State managed:
- `transactions` — list of all transactions
- `role` — current user role (viewer/admin)
- `search` — search input value
- `filterType` — active filter selection
- `toast` — notification visibility