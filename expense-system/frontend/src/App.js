import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/expenses')
          .then(response => {
            setExpenses(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the expenses!", error);
          });
      }, []);

      const handleSearch = () => {
        axios.get('http://localhost:8000/expenses', {
          params: {
            title: titleFilter,
            start_date: startDate,
            end_date: endDate
          }
        })
        .then(response => {
          setExpenses(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the expenses!", error);
        });
      };

      const handleAddExpense = () => {
        const newExpense = {
            title,
            amount: parseFloat(amount),
            date: new Date(date).toISOString(),
            category
          };
      
        console.log('Sending new expense:', newExpense);

        axios.post('http://localhost:8000/expenses', newExpense)
        .then(response => {
          setExpenses([...expenses, response.data]);
          setTitle('');
          setAmount('');
          setDate('');
          setCategory('');
        })
        .catch(error => {
          console.error("There was an error adding the expense!", error);
        });
      };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="form-group">
        <label>Filter by Title</label>
        <input type="text" className="form-control" value={titleFilter} onChange={e => setTitleFilter(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Filter by Start Date</label>
        <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Filter by End Date</label>
        <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>

      <h2>Add New Expense</h2>
      <div className="form-group">
        <label>Title</label>
        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="食">食</option>
          <option value="衣">衣</option>
          <option value="住">住</option>
          <option value="行">行</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleAddExpense}>Add Expense</button>

      <h2>Expenses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
    
}

export default App;