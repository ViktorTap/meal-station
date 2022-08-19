const mongoose = require("mongoose");
const Restaurant = require("../model/Restaurant");

// CREATE
const createNewRestaurant = async (req, res) => {
  const {
    ownerId,
    name,
    description,
    address,
    category,
    phoneNumber,
    priceClass,
    openHours,
    restaurantPicture,
  } = req.body;
  if (
    !ownerId ||
    !name ||
    !category ||
    !description ||
    !phoneNumber ||
    !address ||
    !priceClass ||
    !openHours
  )
    return res.status(400).json({
      message: "All information is required",
    });

  // check for duplicate usernames in the db
  const duplicate = await Restaurant.findOne({ name: name }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // create and store the new restaurant
    const result = await Restaurant.create({
      ownerId: ownerId,
      name: name,
      description: description,
      address: address,
      category: category,
      phoneNumber: phoneNumber,
      priceClass: priceClass,
      openHours: openHours,
      restaurantPicture: restaurantPicture,
    });

    console.log(result);
    res
      .status(201)
      .json({ success: `New restaurant ${name} created! Welcome ${name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  if (!restaurants)
    return res.status(204).json({ message: "No restaurants found" });
  res.json(restaurants);
};

// GET ONE BY ID
const getRestaurant = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Restaurant ID required" });
  const restaurant = await Restaurant.findOne({ _id: req.params.id }).exec();
  if (!restaurant) {
    return res
      .status(204)
      .json({ message: `No restaurant matches ID: ${req.params.id}` });
  }
  res.json(restaurant);
};

const addNewOrder = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Restaurant ID is required" });
  }

  const id = mongoose.Types.ObjectId(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Check ID. ID is not valid" });
  }

  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    return res.status(404).json({ message: "No restaurant found" });
  }

  if (restaurant) {
    const order = req.body;

    if (!order) {
      return res.status(400).json({ message: "All information is required" });
    }

    Restaurant.findOneAndUpdate(
      { _id: id },
      { $push: { orders: order } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
        res.status(201).json({
          success: `New order is registered for ${restaurant.name}`,
        });
      }
    );
  }
};

// DELETE BY ID
const deleteRestaurant = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Restaurant ID is required" });

  try {
    const deleted = await Restaurant.findByIdAndDelete({ _id: req.params.id });
    console.log(deleted);
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ message: "Deleted" });
};
module.exports = {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurant,
  addNewOrder,
  deleteRestaurant,
};
