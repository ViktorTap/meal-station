const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order: [Schema.Types.Mixed],
  created: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
