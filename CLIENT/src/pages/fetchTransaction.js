import React, { useState, useEffect } from "react";
import axios from "axios";
import "./fetchTransaction.css";
import { TableOutlined, AreaChartOutlined } from "@ant-design/icons";
import Tabular from "./tabular";
import Graphical from "./graphical";

const FetchTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [type, setType] = useState("all");
  const [viewTabular, setViewTabular] = useState(true);

  const frequencies = {
    "Last Week": "7",
    "Last Month": "30",
    "Last Year": "365",
    Custom: "custom",
  };
  const types = { All: "all", Expense: "Expense", Income: "Income" };

  const fetchTransactions = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        "/api/v1/transactions/get-transactions",
        {
          idToBeFetched: currentUser._id,
          frequency,
          daterange: dateRange,
          type,
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [frequency, dateRange, type]);

  return (
    <div className="fetch-transaction-container">
      <h2 className="fetch-transaction-title">Transactions</h2>

      <div className="filters">
        <div className="filter">
          <label>Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            {Object.entries(frequencies).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {frequency === "custom" && (
          <div className="date-range">
            <label>Start Date:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
            />

            <label>End Date:</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
            />
          </div>
        )}

        <div className="filter">
          <label>Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            {Object.entries(types).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="viewFetched">
        {/* Toggle View Buttons */}
        <div className="view-toggle">
          <TableOutlined
            className="toggle-button table-view"
            onClick={() => setViewTabular(true)}
          />
          <AreaChartOutlined
            className="toggle-button graph-view"
            onClick={() => setViewTabular(false)}
          />
        </div>

        {/* Tabular or Graphical View */}
        <div className="view-container">
          {viewTabular ? (
            <div className="tabular-view">
              <Tabular transactions={transactions} />
            </div>
          ) : (
            <div className="graphical-view">
              <Graphical transactions={transactions}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchTransaction;
