const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
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
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  roles: {
    Owner: {
      type: Number,
      default: 1984, // if nothing else then automatically assained to default value
    },
    User: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
