const mongoose = require("mongoose");
const User = require("../model/User");
const Owner = require("../model/Owner");
const Order = require("../model/Order");

// CREATE
const createNewOrder = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });

  const id = mongoose.Types.ObjectId(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("NOT VALID ID");
    return false;
  }

  const user = await User.findById(id);
  const owner = !user && (await Owner.findById(id));

  if (!user && !owner)
    return res
      .status(404)
      .json({ message: "No user or order information found" });

  if (user) {
    const order = req.body;

    if (!order)
      return res.status(400).json({ message: "All information is required" });

    User.findOneAndUpdate(
      { _id: id },
      { $push: { orders: order } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
        res.status(201).json({
          success: `New dish order is registered for ${user.username}`,
        });
      }
    );
  }

  if (owner) {
    const order = req.body;

    if (!order)
      return res.status(400).json({ message: "All information is required" });

    Owner.findOneAndUpdate(
      { _id: id },
      { $push: { orders: order } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
        res.status(201).json({
          success: `New dish order is registered for ${owner.username}`,
        });
      }
    );
  }
};

module.exports = { createNewOrder };
