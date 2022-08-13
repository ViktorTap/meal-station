const mongoose = require("mongoose");
const User = require("../model/User");
const Owner = require("../model/Owner");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await User.findOne({ username: user }).exec();
  const foundOwner = await Owner.findOne({ username: user }).exec();
  if (!foundUser && !foundOwner) return res.sendStatus(401); // Unauthorized

  // evaluate password

  const match = await bcrypt.compare(
    password,
    foundUser ? foundUser.password : foundOwner.password
  );
  if (match) {
    const roles = Object.values(
      foundUser ? foundUser.roles : foundOwner.roles
    ).filter(Boolean); // eliminating nulls

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser ? foundUser.username : foundOwner.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser ? foundUser.username : foundOwner.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser
      ? foundUser.refreshToken
      : (foundOwner.refreshToken = refreshToken);
    foundUser ? await foundUser.save() : await foundOwner.save();

    // changed to await functions...

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const foundResult = foundUser ? foundUser : foundOwner;
    const id = mongoose.Types.ObjectId(foundResult._id);

    res.json({ roles, accessToken, foundResult, id });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
