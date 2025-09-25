import React, { useState } from "react";
import Layout from "../components/layouts/layout";
import "./homepage.css";
import AddTransaction from "./addTransaction";
import FetchTransaction from "./fetchTransaction";

const Homepage = () => {
  const [addWindow, setAddWindow] = useState(false);
  const [fetchWindow, setFetchWindow] = useState(true);

  const addTransactionHandler = () => {
    setAddWindow(true);
    setFetchWindow(false);
  };

  const fetchTransactionHandler = () => {
    setAddWindow(false);
    setFetchWindow(true);
  };
  return (
    <Layout>
      <div className="tabular-container">

{/* Header Buttons */}
<div className="tabular-header">
  <button className="tabular-button" onClick={addTransactionHandler}>
    Add
  </button>
  <button className="tabular-button" onClick={fetchTransactionHandler}>
    Fetch
  </button>
</div>

{/* Transaction Forms */}
<div className="tabular-content">
  {addWindow && <AddTransaction />}
  {fetchWindow && <FetchTransaction />}
</div>

</div>
    </Layout>
  );
};

export default Homepage;
