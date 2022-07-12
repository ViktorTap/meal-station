const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, firstname, lastname, address, password } = req.body;
  if (!username || !password || !firstname || !address)
    return res.status(400).json({
      message: "Username, firstname, address and password are required",
    });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store the new user
    const result = await User.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      password: hashedPwd,
    });

    console.log(result);
    res
      .status(201)
      .json({ success: `New user ${username} created! Welcome ${firstname}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
