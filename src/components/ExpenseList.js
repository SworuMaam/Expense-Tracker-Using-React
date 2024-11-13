import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseList({ expenses }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    const getExpenses = async () => {
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
        setFilteredExpenses(loadedExpenses); // Set filtered data initially
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    
    getExpenses();
  }, []);

  // Function to filter expenses when button is clicked
  const applyFilter = () => {
    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (!startDate || expenseDate >= new Date(startDate)) &&
             (!endDate || expenseDate <= new Date(endDate));
    });
    setFilteredExpenses(filtered);
  };

  // Calculate total based on filtered expenses
  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="ml-64">
      <h2 className="text-3xl font-bold mb-4">Expenses</h2>

      <div className="flex space-x-4 mb-4">
        <div>
          <label>Start Date</label><br />
          <input type="date" onChange={(e) => setStartDate(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label>End Date</label><br />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} className="border p-2" />
        </div>
        <button onClick={applyFilter} className="bg-blue-500 text-white px-4 py-2 rounded mt-6">
          Apply Filter
        </button>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-4">Total Expense: ${totalExpense.toFixed(2)}</h3>
    </div>
  );
}

export default ExpenseList;
