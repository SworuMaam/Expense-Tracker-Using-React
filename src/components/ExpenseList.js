import React, { useState } from 'react';

function ExpenseList({ expenses }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter expenses by date range
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (!startDate || expenseDate >= new Date(startDate)) &&
           (!endDate || expenseDate <= new Date(endDate));
  });

  // Calculate total expense
  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className='ml-64'>
      <h2 className="text-3xl font-bold mb-4">  Expenses</h2>

      <div className="flex space-x-4 mb-4">
        <div>
          <label>Start Date</label><br></br>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} className="border p-2" />
        </div>
        <div>
          <label>End Date</label><br></br>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} className="border p-2" />
        </div>
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