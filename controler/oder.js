import Order from "../models/odermodel.js";
import { iscustomer } from "./user.js";
import products from "../models/productmodel.js";

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
    const newordersarray=[]
    for(let i=0;i<newOrderData.orderedItems.length;i++){
      const product =await products.findOne({
      productid:newOrderData.orderedItems[i].productid
      })
      if(product==null){
        res.json({
          message:"product"+newOrderData.orderedItems[i].productid+" not found"
        })
        return;
      }
      newordersarray[i]={
        name:product.productname,
        productname:product.productname,
        price:product.price,
        quantity:newOrderData.orderedItems[i].quantity,
        image:product.image[0],
      }
      console.log(newordersarray)
    }
    newOrderData.orderedItems=newordersarray
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;
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

