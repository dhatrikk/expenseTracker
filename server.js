const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB.js");
const path = require("path");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.use("/api/v1/USER", require("./routes/userRoute.js"));

app.use("/api/v1/transactions",require("./routes/transactionRoutes.js"));

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*", function (req,res) {
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
});