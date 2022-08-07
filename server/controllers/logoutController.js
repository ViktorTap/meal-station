const User = require("../model/User");
const Owner = require("../model/Owner");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // is refreshToken in DB?
  const foundUser = await User.findOne({ refreshToken }).exec();
  const foundOwner = await Owner.findOne({ refreshToken }).exec();

  if (!foundUser && !foundOwner) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundOwner.refreshToken = "";
  foundUser.refreshToken = "";

  await foundUser.save();
  await foundOwner.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only serves on https (in production)
  res.sendStatus(204);
};

module.exports = { handleLogout };
