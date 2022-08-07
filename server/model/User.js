const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

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
      default: 2001,
    },
  },
  password: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: ObjectId,
      ref: "Order",
    },
  ],

  refreshToken: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
