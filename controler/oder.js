import Order from "../models/odermodel.js";
import { iscustomer } from "./user.js";
import products from "../models/productmodel.js";

export async function createoder(req, res) {
 
  if (!iscustomer(req)) {
    res.json({
      message: "you have to be a customer to create an order",
    });
    return;
  }

  try {

    const orderList = await Order.find().sort({ date: -1 }).limit(1);
    let orderId;

    if (orderList.length === 0) {
      orderId = "CBC001";
    } else {
    
      const lastOrderId = orderList[0].orderId;

  
      const numericPart = parseInt(lastOrderId.replace("CBC", ""));

      
      const newNumericPart = numericPart + 1;

     
      const paddedNumber = String(newNumericPart).padStart(3, "0");

     
      orderId = "CBC" + paddedNumber;
    }

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
        quantity:newOrderData.orderedItems[i].qty,
        image:product.image[0],
      }
      console.log(newordersarray)
    }
    newOrderData.orderedItems=newordersarray
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;
    const newOrder = new Order(newOrderData);

    const savedordr=await newOrder.save();
    res.json({
      message: "Order added successfully",
      orderId: orderId,
      savedordr:savedordr
   });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding order",
      error: err,
    });
  }
}

export async function getlastpricetooder(req, res) {
  try {
    const newOrderData = req.body;
    let total = 0;
    let lasprice = 0;
    let descountprice = 0;
    const newordersarray = [];

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await products.findOne({
        productid: newOrderData.orderedItems[i].productid,
      });

      if (!product) {
        return res.json({
          message:
            "Product " + newOrderData.orderedItems[i].productid + " not found",
        });
      }

    
      const unitPrice = Number(product.price) || 0;
      const lastUnitPrice = Number(product.lasprice) || 0;
      const qty = Number(newOrderData.orderedItems[i].qut) || 0;

      total += unitPrice * qty;
      lasprice += lastUnitPrice * qty;

      newordersarray.push({
        name: product.productname,
        productname: product.productname,
        price: unitPrice,
        quantity: qty,
        image: product.image[0],
      });
    descountprice = total - lasprice;

    newOrderData.orderedItems = newordersarray;
    newOrderData.total = total;

    res.json({
      orderedItems: newordersarray,
      total: total,
      lastprice: lasprice,
      descountprice: descountprice,
    });
  }}catch (err) {
    console.error("Order error:", err); 
    res.status(500).json({
      message: "Error in adding order",
      error: err.message,
    });
  }
}
