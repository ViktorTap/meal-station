const Owner = require("../model/Owner");
const bcrypt = require("bcrypt");

const handleNewOwner = async (req, res) => {
  const { username, firstname, lastname, address, phoneNumber, password } =
    req.body;
  if (
    !username ||
    !password ||
    !firstname ||
    !lastname ||
    !address ||
    !phoneNumber
  )
    return res.status(400).json({
      message: "All information is required",
    });

  // check for duplicate ownernames in the db
  const duplicate = await Owner.findOne({ username: username }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store the new user
    const result = await Owner.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phoneNumber: phoneNumber,
      password: hashedPwd,
    });

    console.log(result);
    res
      .status(201)
      .json({ success: `New owner ${username} created! Welcome ${firstname}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewOwner };
