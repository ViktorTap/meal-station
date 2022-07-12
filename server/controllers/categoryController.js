const Restaurant = require("../model/Restaurant");

// FIND BY CATEGORY
// CAFE
const findByCafe = async (req, res) => {
  const result = await Restaurant.find({ category: "Cafe" }).exec();
  if (!result) res.status(204).json({ message: "No Cafe category found" });
  console.log(result.length);
  res.json(result);
};

// PIZZERIA
const findByPizzeria = async (req, res) => {
  const result = await Restaurant.find({ category: "Pizzeria" }).exec();
  if (!result) res.status(204).json({ message: "No Pizzeria category found" });
  console.log(result.length);
  res.json(result);
};

// BURGERS
const findByBurgers = async (req, res) => {
  const result = await Restaurant.find({ category: "Burgers" }).exec();
  if (!result) res.status(204).json({ message: "No Burgers category found" });
  console.log(result.length);
  res.json(result);
};

// BUFFET
const findByBuffet = async (req, res) => {
  const result = await Restaurant.find({ category: "Buffet" }).exec();
  if (!result) res.status(204).json({ message: "No Buffet category found" });
  console.log(result.length);
  res.json(result);
};

// FINE DINING
const findByFineDining = async (req, res) => {
  const result = await Restaurant.find({ category: "Fine Dining" }).exec();
  if (!result)
    res.status(204).json({ message: "No Fine Dining category found" });
  console.log(result.length);
  res.json(result);
};

// FAST FOOD
const findByFastFood = async (req, res) => {
  const result = await Restaurant.find({ category: "Fast Food" }).exec();
  if (!result) res.status(204).json({ message: "No Fast Food category found" });
  console.log(result.length);
  res.json(result);
};

// FAMILY STYLE
const findByFamilyStyle = async (req, res) => {
  const result = await Restaurant.find({ category: "Family Style" }).exec();
  if (!result)
    res.status(204).json({ message: "No Family Style category found" });
  console.log(result.length);
  res.json(result);
};

// ASIAN
const findByAsian = async (req, res) => {
  const result = await Restaurant.find({ category: "Asian" }).exec();
  if (!result) res.status(204).json({ message: "No Asian category found" });
  console.log(result.length);
  res.json(result);
};
// MEDITERRANEAN
const findByMediterranean = async (req, res) => {
  const result = await Restaurant.find({ category: "Mediterranean" }).exec();
  if (!result)
    res.status(204).json({ message: "No Mediterranean category found" });
  console.log(result.length);
  res.json(result);
};
// PASTRIES
const findByPastries = async (req, res) => {
  const result = await Restaurant.find({ category: "Pastries" }).exec();
  if (!result) res.status(204).json({ message: "No Pastries category found" });
  console.log(result.length);
  res.json(result);
};

module.exports = {
  findByCafe,
  findByPizzeria,
  findByBurgers,
  findByAsian,
  findByBuffet,
  findByPastries,
  findByFamilyStyle,
  findByFastFood,
  findByFineDining,
  findByMediterranean,
};
