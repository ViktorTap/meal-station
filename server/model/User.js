const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  item: String,
  quantity: Number,
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001, // if nothing else then automatically assained to default value
    },
    Owner: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [orderSchema],
  refreshToken: String,
});

module.exports = mongoose.model("Order", orderSchema);
module.exports = mongoose.model("User", userSchema);
