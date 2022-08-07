const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    ownerId: {
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
    address: {
      type: String,
      required: true,
    },
    category: {
      type: [
        {
          type: String,
          enum: [
            "Cafe",
            "Pizzeria",
            "Burgers",
            "Buffet",
            "Fine Dining",
            "Fast Food",
            "Family Style",
            "Asian",
            "Mediterranean",
            "Pastries",
          ],
        },
      ],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    priceClass: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    openHours: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: [Schema.Types.Mixed],
        created: { type: Date, default: Date.now },
      },
    ],
    restaurantPicture: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
