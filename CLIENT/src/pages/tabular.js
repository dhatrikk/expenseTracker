import React from "react";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import "./tabular.css";

const Tabular = ({ transactions }) => {
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_Backend_url}/api/v1/transactions/delete-transaction/${id}`);
      alert("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction!");
    }
  };

  return (
    <div className="tabular-container">
      {transactions.length === 0 ? (
        <p className="no-transactions-message">No transactions found.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Reference</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td>${txn.amount}</td>
                <td>{txn.type}</td>
                <td>{txn.category}</td>
                <td>{txn.reference || "N/A"}</td>
                <td>{txn.description || "N/A"}</td>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
                <td className="action-icons">
                  <DeleteTwoTone className="delete-icon" onClick={() => deleteHandler(txn._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tabular;
