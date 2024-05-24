const Order = require("../Model/Order");
const OrderItm = require("../Model/OrderItm");

const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find()
      .select("price phone country city dateOrdered")
      .sort({ dateOrdered: +1 });
  } catch (err) {
    console.log("err");
  }
  if (!orders) {
    return res.status(404).json({ message: "order not found" });
  } else {
    return res.status(200).json({ orders });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let order;
  try {
    order = await Order.findById(id).populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });
  } catch (err) {
    console.log("err");
  }
  if (!order) {
    return res.status(404).json({ message: "order not found" });
  } else {
    return res.status(200).json({ order });
  }
};
/*create-order*/
const addOrder = async (req, res, next) => {
  const orderItemIds = await Promise.all(
    req.body.orderItems.map(async (orderItm) => {
      let newOrderItm = new OrderItm({
        quantity: orderItm.quantity,
        product: orderItm.product,
      });
      newOrderItm = await newOrderItm.save();
      return newOrderItm._id;
    })
  );

  const orderItemsIdsResolved = await orderItemIds;
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItm.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice; // this is price of one item multiplird by ites quantity!
    })
  );
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  console.log(totalPrice);
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress: req.body.shippingAddress,
      shippingAddress2: req.body.shippingAddress,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    const createdOrder = await order.save();

    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
};
/*update-order!*/
const updateOrder = async (req, res) => {
  let id = req.params.id;
  let order;
  try {
    order = await Order.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!order) {
    return res.status(404).json({ message: "oreder didn't found!" });
  }

  return res.status(200).json({ order });
};

//order order????
const deleteOrder = (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndRemove(id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItm.findByIdAndRemove(orderItem);
        });
        return res.status(400).json({ message: "order has deleted !" });
      } else {
        return res.status(400).json({ message: "order could not found!" });
      }
    })
    .catch((err) => console.log(err));
};
/*
         getTotal Sales Aggrigate functiones in mongodb!
         $groupong in mongodb is joinining tables and docummentes like joining tables in RDBMS!
         */

const getTotalSales = async (req, res, next) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "totalPrice" } } },
  ]);
  if (!totalSales) {
    return res.status(400).json({ message: "no sales found!" });
  }

  res.send({ totalSales: totalSales.pop().totalsales });
};
/*get-order-count*/
const getOrdercount = async (req, res, next) => {
  let ordercount = await Order.countDocuments();
  if (!ordercount) {
    return res.send("order not found!");
  }
  res.send({ ordercount: ordercount });
};
/*get the number of orders by a user*/

const userOrders = async (req, res, next) => {
  const userorders = await Order.findById({ user: req.params.user })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ orderdate: -1 });
  if (!userorders) {
    return res.status(404).json({ message: "order not found!" });
  }
  res.send(userorders);
};

module.exports = {
  getAllOrders,
  updateOrder,
  addOrder,
  getById,
  deleteOrder,
  getTotalSales,
  getOrdercount,
  userOrders,
};
