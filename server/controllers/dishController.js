const Dish = require("../model/Dish");

// CREATE
const createNewDish = async (req, res) => {
  const { restaurantId, name, description, price, dishPicture } = req.body;
  if (!restaurantId || !name || !description || !price)
    return res.status(400).json({ message: "All information is required" });

  // checking duplicate
  const duplicate = await Dish.findOne({ name: name }).exec();

  if (duplicate) return res.sendStatus(409); //conflict

  try {
    // create and store the new dish
    const newDish = await Dish.create({
      restaurantId: restaurantId,
      name: name,
      description: description,
      price: price,
      dishPicture: dishPicture,
    });
    console.log(newDish);
    res.status(201).json({ success: `New dish ${name} is in the menu` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL BY RESTAURANT ID
const getAllByRestaurantId = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Restaurant ID is required" });
  const menu = await Dish.find({ restaurantId: req.params.id }).exec();
  if (!menu) {
    return res.status(204).json({ message: "No menu" });
  }
  res.json(menu);
};

module.exports = { createNewDish, getAllByRestaurantId };
