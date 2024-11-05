import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 ">        
        {/* Expense Form */}
        <ExpenseForm setExpenses={setExpenses} />
        
        {/* Expense List - Appears directly below Expense Form */}
        <div className="mt-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
