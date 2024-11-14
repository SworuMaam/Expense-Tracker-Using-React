import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/SideBar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-541e6-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
        );

        const loadedExpenses = [];
        for (const key in response.data) {
          const expenseData = response.data[key];
          loadedExpenses.push({
            id: key,
            name: expenseData['expense-name'],
            amount: parseFloat(expenseData['expense-amount']),
            date: expenseData['expense-date'],
          });
        }
        setExpenses(loadedExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4">
        <ExpenseForm setExpenses={setExpenses} />
        
        <div className="mt-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
