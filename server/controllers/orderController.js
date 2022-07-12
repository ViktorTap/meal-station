const User = require("../model/User");

// CREATE
const createNewOrder = async (req, res) => {
  const { item, quantity, userId } = req.body;
  if (!item || !quantity || !userId)
    return res.status(400).json({ message: "All information is required" });

  // find right user and users orders
  const user = await User.findById({ userId }).exec();
  if (!user)
    return res
      .status(404)
      .json({ message: "No user or order information found" });

  const orders = user.orders;

  try {
    // create and store the new order
    const newOrder = orders.push({
      item: item,
      quantity: quantity,
    });
    console.log(newOrder);
    res
      .status(201)
      .json({ success: `New dish order ${newOrder} is registered` });

    const updated = await user.save({
      timestamps: { createdAt: true, updatedAt: false },
    });
    console.log(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createNewOrder };
