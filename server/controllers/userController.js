const User = require("../model/User");
const Owner = require("../model/Owner");
const Restaurant = require("../model/Restaurant");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.find();
  const owners = await Owner.find();
  if (!users && !owners)
    return res.status(204).json({ message: "No users found" });
  res.json({ users: users, owners: owners });
};

// GET USER BY ID
const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const foundUser = await User.findOne({ _id: req.params.id }).exec();
  const foundOwner = await Owner.findOne({ _id: req.params.id }).exec();
  if (!foundUser && !foundOwner) {
    return res
      .status(204)
      .json({ message: `No user matches ID: ${req.params.id}` });
  }
  res.json(foundUser ? foundUser : foundOwner);
};

// GET OWNER'S RESTAURANTS BY SAME ID
const getOwnerRestaurant = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Owner's ID required" });
  const restaurant = await Restaurant.find({ ownerId: req.params.id });
  if (!restaurant) {
    return res
      .status(204)
      .json({ message: `No restaurant matches ID: ${req.params.id}` });
  }
  res.json(restaurant);
};

module.exports = { getAllUsers, getUser, getOwnerRestaurant };
