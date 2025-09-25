const userModel = require("../models/userModel.js");

const registerController = async (req, res) => {
  try {
    const newUser = await new userModel(req.body).save();
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
