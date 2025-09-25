import React, { useState } from "react";
import axios from "axios";
import "./addTransaction.css";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    reference: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Food", "Salary", "Rent", "Shopping", "Entertainment",
    "Health", "Education", "Transport", "Bills", "Other"
  ];
  
  const types = ["Income", "Expense"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      await axios.post(`${process.env.REACT_APP_Backend_url}/api/v1/transactions/add-transaction`, { userid: currentUser._id, ...formData });
      
      setFormData({
        amount: "",
        type: "",
        category: "",
        reference: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });

      alert("Transaction Added Successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="transaction-form-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required min="0" />

        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <input type="text" name="reference" value={formData.reference} onChange={handleChange} placeholder="Reference (optional)" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description (Max 500 chars)" maxLength="500" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
