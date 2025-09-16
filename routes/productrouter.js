import mongoose from "mongoose";
import express from "express";
import {getProducts,addProduct,removeProduct,getProductByName, updateproduct} from '../controler/productconroler.js'
const productrouter=express.Router();


productrouter.get('/',getProducts)
productrouter.get('/:name',getProductByName)
productrouter.delete("/:productid", removeProduct);

productrouter.post('/',addProduct)
productrouter.put("/:productid",updateproduct)
   
    
export default productrouter;  
    