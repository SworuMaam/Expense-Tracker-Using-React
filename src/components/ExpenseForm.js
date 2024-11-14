import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function ExpenseForm({ setExpenses }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      expenseName: "",
      amount: 0,
      date: "",
    },
  });

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

  const onSubmit = async (data) => {
    const formattedData = {
      "expense-name": data.expenseName,
      "expense-amount": data.amount,
      "expense-date": data.date,
    };

    try {
      await axios.post(
        "https://expense-tracker-541e6-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
        formattedData
      );

      fetchExpenses();

      reset();

      alert('Expense added successfully!');

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="p-2 ml-64 mt-2">
      <h2 className="text-3xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <table className="w-200 border-collapse">
          <tbody>
            <tr>
              <td className="p-2">
                <label>Expense Name:</label>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  {...register('expenseName', { required: 'Expense name is required' })}
                  className="border p-2 w-full"
                />
                {errors.expenseName && <span className="text-red-500">{errors.expenseName.message}</span>}
              </td>
            </tr>

            <tr>
              <td className="p-2">
                <label>Amount:</label>
              </td>
              <td className="p-2">
                <input
                  type="number"
                  {...register('amount', { required: 'Amount is required', min: { value: 0, message: 'Amount must be positive' } })}
                  className="border p-2 w-full"
                />
                {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
              </td>
            </tr>

            <tr>
              <td className="p-2">
                <label>Date:</label>
              </td>
              <td className="p-2">
                <input
                  type="date"
                  {...register('date', { required: 'Date is required', validate: value => new Date(value) <= new Date() || 'Future dates not allowed' })}
                  className="border p-2 w-full"
                />
                {errors.date && <span className="text-red-500">{errors.date.message}</span>}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="flex justify-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ExpenseForm;
