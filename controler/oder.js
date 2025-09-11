import Order from "../models/odermodel.js";
import { iscustomer } from "./user.js";

export async function createoder(req, res) {
  // check if customer
  if (!iscustomer(req)) {
    res.json({
      message: "you have to be a customer to create an order",
    });
    return;
  }

  try {
    // get last order
    const orderList = await Order.find().sort({ date: -1 }).limit(1);
    let orderId;

    if (orderList.length === 0) {
      orderId = "CBC001";
    } else {
      // Get last order id (ex: "CBC001")
      const lastOrderId = orderList[0].orderId;

      // Extract number part (remove "CBC")
      const numericPart = parseInt(lastOrderId.replace("CBC", ""));

      // Increment
      const newNumericPart = numericPart + 1;

      // Pad number with leading zeros (ex: 2 -> "002")
      const paddedNumber = String(newNumericPart).padStart(3, "0");

      // Create new id
      orderId = "CBC" + paddedNumber;
    }

    // create new order data
    let newOrderData = req.body;
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email; // add email from token

    const newOrder = new Order(newOrderData);

    await newOrder.save();
    res.json({
      message: "Order added successfully",
      orderId: orderId,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding order",
      error: err,
    });
  }
}
