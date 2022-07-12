const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  dishPicture: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
});

module.exports = mongoose.model("Dish", dishSchema);
