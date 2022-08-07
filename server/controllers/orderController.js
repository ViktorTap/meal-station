const mongoose = require("mongoose");
const User = require("../model/User");
const Owner = require("../model/Owner");
const Order = require("../model/Order");

// CREATE
const createNewOrder = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });

  const id = mongoose.Types.ObjectId(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("NOT VALID ID");
    return false;
  }

  const user = await User.findById(id);
  const owner = !user && (await Owner.findById(id));

  if (!user && !owner)
    return res
      .status(404)
      .json({ message: "No user or order information found" });

  // const orderObj = new Order(order);
  // await orderObj.save();

  // create and save order
  // saved order push to user.orders

  // if (user) {
  //   user.orders.push(orderObj);
  //   await user.save();
  //   console.log(user.orders);
  // }

  // if (user) {
  //   user.then((user) => {
  //     const username = user.username;
  //     console.log(username);
  //     const filter = { username: user.username };
  //     const update = { orders: order };
  //     async function updateUserOrders(filter, update) {
  //       await User.findByIdAndUpdate(filter, update);
  //     }
  //     updateUserOrders(filter, update);
  //     res.json({ message: "Order for user created" });
  //   });
  // } else if (owner) {
  //   console.log("owner found");
  // } else {
  //   res
  //     .status(500)
  //     .json({ message: "Something went fron in if else oder controller" });
  // }

  // if (user) {
  //   const order = new Order();
  //   order.items = items;
  //   order
  //     .save()
  //     .then((result) => {
  //       user.orders.push(order);
  //       user.save();
  //       res.json({ message: "Order for user created" });
  //     })
  //     .catch((error) => {
  //       res.status(500).json({ error });
  //     });
  // }

  // if (owner) {
  //   const order = new Order();
  //   order.items = items;
  //   order
  //     .save()
  //     .then((result) => {
  //       owner.orders.push(order);
  //       owner.save();
  //       res.json({ message: "Order for owner created" });
  //     })
  //     .catch((error) => {
  //       res.status(500).json({ error });
  //     });
  // }
  // same code with user (worked)
  // try {

  if (user) {
    // const order = [req.body];
    // TÄÄ TOIMII JOTENKUTEN:
    // const order = new Order( {order: req.body} );
    // await order.save();

    const order = req.body;

    if (!order)
      return res.status(400).json({ message: "All information is required" });

    User.findOneAndUpdate(
      { _id: id },
      { $push: { orders: order } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
        res.status(201).json({
          success: `New dish order is registered for ${user.username}`,
        });
      }
    );
  }
  if (owner) {
    // const order = [req.body];
    // TÄÄ TOIMII JOTENKUTEN:
    // const order = new Order( {order: req.body} );
    // await order.save();

    const order = req.body;

    if (!order)
      return res.status(400).json({ message: "All information is required" });

    Owner.findOneAndUpdate(
      { _id: id },
      { $push: { orders: order } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
        res.status(201).json({
          success: `New dish order is registered for ${owner.username}`,
        });
      }
    );
  }
  //   if (owner) {
  //     console.log("no user found trying owner");
  //     Owner.findOneAndUpdate(
  //       { _id: req.params.id },
  //       { $push: { orders: items } },
  //       function (error, success) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log(success);
  //         }
  //         res.status(201).json({
  //           success: `New dish order is registered for ${
  //             user ? user.username : owner.username
  //           }`,
  //         });
  //       }
  //     );
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};

module.exports = { createNewOrder };
