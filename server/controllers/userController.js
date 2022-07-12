const User = require("../model/User");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

// GET USER BY ID
const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const foundUser = await User.findOne({ _id: req.params.id }).exec();
  if (!foundUser) {
    return res
      .status(204)
      .json({ message: `No user matches ID: ${req.params.id}` });
  }
  res.json(foundUser);
};

module.exports = { getAllUsers, getUser };
