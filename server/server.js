require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// PROFILE
app.use("/profile", require("./routes/user"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
// ORDERS
app.use("/", require("./routes/order"));

// POST
app.use("/auth", require("./routes/auth"));
app.use("/register-user", require("./routes/userRegister"));
app.use("/register-owner", require("./routes/ownerRegister"));

// RESTAURANT(S)
app.use("/restaurant", require("./routes/restaurant"));

// DISH(ES)
app.use("/restaurant", require("./routes/dish"));

// CATEGORY
app.use("/category", require("./routes/category"));

// app.use("/category/asian", require("./routes/category"));
// app.use("/category/buffet", require("./routes/category"));
// app.use("/category/burgers", require("./routes/category"));
// app.use("/category/family-style", require("./routes/category"));
// app.use("/category/fast-food", require("./routes/category"));
// app.use("/category/fine-dining", require("./routes/category"));
// app.use("/category/mediterranean", require("./routes/category"));
// app.use("/category/pastries", require("./routes/category"));
// app.use("/category/pizzeria", require("./routes/category"));

app.use(verifyJWT); // works like waterfall

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
