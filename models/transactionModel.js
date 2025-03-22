const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid:{
      type: String,
      required:true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    reference: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      maxlength: 500,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true, collection: "TRANSACTIONS" }
);

const transactionModel = mongoose.model("TRANSACTIONS", transactionSchema);

module.exports = transactionModel;
