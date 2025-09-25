import React from "react";
import { Progress } from "antd";
import "./graphical.css";

const Graphical = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter((t) => t.type === "Income").length;
  const totalExpenseTransactions = transactions.filter((t) => t.type === "Expense").length;

  const totalIncomePercent = ((totalIncomeTransactions / totalTransactions) * 100).toFixed(0) || 0;
  const totalExpensePercent = ((totalExpenseTransactions / totalTransactions) * 100).toFixed(0) || 0;

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncomeAmount = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenseAmount = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="graphical-container">
      {/* Transactions & Turnover Section */}
      <div className="graph-row">
        {/* Transaction Overview */}
        <div className="graph-card">
          <h4>Total Transactions: {totalTransactions}</h4>
          <div className="progress-summary">
            <div>
              <p className="income-text">Income: {totalIncomeTransactions}</p>
              <Progress type="circle" strokeColor="#27ae60" percent={totalIncomePercent} />
            </div>
            <div>
              <p className="expense-text">Expense: {totalExpenseTransactions}</p>
              <Progress type="circle" strokeColor="#e74c3c" percent={totalExpensePercent} />
            </div>
          </div>
        </div>

        {/* Income vs Expense */}
        <div className="graph-card">
          <h4>Total Turnover: {totalAmount.toFixed(2)}</h4>
          <div className="progress-summary">
            <div>
              <p className="income-text">Income: {totalIncomeAmount.toFixed(2)}</p>
              <Progress type="circle" strokeColor="#27ae60" percent={((totalIncomeAmount / totalAmount) * 100).toFixed(0) || 0} />
            </div>
            <div>
              <p className="expense-text">Expense: {totalExpenseAmount.toFixed(2)}</p>
              <Progress type="circle" strokeColor="#e74c3c" percent={((totalExpenseAmount / totalAmount) * 100).toFixed(0) || 0} />
            </div>
          </div>
        </div>
      </div>

      {/* Category-Wise Income & Expense */}
      <div className="category-container">
        {/* Income Section */}
        <div className="category-card income-card">
          <h4>Categorywise Income</h4>
          {transactions.filter((t) => t.type === "Income").map((t, index) => (
            <div key={index} className="category-item">
              <span>{t.category}</span>
              <Progress percent={((t.amount / totalIncomeAmount) * 100).toFixed(0)} strokeColor="blue" />
            </div>
          ))}
        </div>

        {/* Expense Section */}
        <div className="category-card expense-card">
          <h4>Categorywise Expense</h4>
          {transactions.filter((t) => t.type === "Expense").map((t, index) => (
            <div key={index} className="category-item">
              <span>{t.category+"  "}</span>
              <Progress percent={((t.amount / totalExpenseAmount) * 100).toFixed(0)} strokeColor="blue" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graphical;
