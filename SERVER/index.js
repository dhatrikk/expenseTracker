const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB.js");

dotenv.config();

// Initialize express app first
const app = express();

// Middlewares
app.use(cors({
  origin: "https://expensestrak.vercel.app", // your frontend domain
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Routes
app.use("/api/v1/USER", require("./routes/userRoute.js"));
app.use("/api/v1/transactions", require("./routes/transactionRoutes.js"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ App is running on port ${PORT}`);
});
