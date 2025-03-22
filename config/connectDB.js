const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config(); 


const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Data Base Connected".bgCyan)
    }catch(error){
        console.log(`${error}`.bgRed);
    }
}

module.exports = connectDB;