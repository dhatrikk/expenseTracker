const transactionModel = require("../models/transactionModel");
const moment =require("moment");

const getAllTransactions = async (req, res) => {
  try {
    const frequency = req.body.frequency;
    const daterange = req.body.daterange;
    const type = req.body.type;
    const pastTransactions = await transactionModel.find(
      {
        userid: req.body.idToBeFetched,
        ...(type!== "all" && {type}),
        ...(frequency === "custom"
            ? {
                  date: {
                      $gte: new Date(daterange.startDate),
                      $lte: new Date(daterange.endDate),
                  },
              }
            : {
                  date: {
                      $gt: moment().subtract(Number(frequency), "days").toDate(),
                  },
              }),
    });
    res.status(200).json(pastTransactions);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = await new transactionModel(req.body).save();
    res.status(200).json({
      success: true,
      newTransaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const deleteTransaction = async (req,res) => {
  try {
    const id  = req.params.id;
    const deletedTransaction = await transactionModel.findOneAndDelete({_id:id});
    res.status(200).json({
      success:true,
      deletedTransaction,
    })
  } catch (error) {
    res.status(400).json({
      success:false,
    error,    })
  }
}

module.exports = { getAllTransactions, addTransaction, deleteTransaction };
