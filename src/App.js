import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4 ">        
        <ExpenseForm setExpenses={setExpenses} />
        
        <div className="mt-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
