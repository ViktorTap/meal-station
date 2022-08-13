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

// UPDATE USER OR OWNER
const updateUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const user = await User.findOne({ _id: req.params.id }).exec();
  const owner = !user && (await Owner.findOne({ _id: req.params.id }).exec());

  if (!user && !owner) {
    return res
      .status(204)
      .json({ message: `No user matches ID: ${req.params.id}` });
  }

  if (user) {
    const filter = { _id: req.params.id };
    const update = {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      address: req?.body?.address,
    };
    try {
      const result = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(result);
      res
        .status(201)
        .json({ success: `${user.username} information is updated` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (owner) {
    const filter = { _id: req.params.id };
    const update = {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      address: req?.body?.address,
      phoneNumber: req?.body?.phoneNumber,
    };
    try {
      const result = await Owner.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(result);
      res
        .status(201)
        .json({ success: `${owner.username} information is updated` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
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

module.exports = { getAllUsers, getUser, getOwnerRestaurant, updateUser };
