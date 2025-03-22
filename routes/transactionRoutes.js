const express = require("express");
const { addTransaction, getAllTransactions , deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

router.post("/add-transaction",addTransaction);

router.post("/get-transactions",getAllTransactions);

router.delete("/delete-transaction/:id", deleteTransaction);

module.exports= router;