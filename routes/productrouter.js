import mongoose from "mongoose";
import express from "express";
import {getProducts,addProduct,removeProduct,getProductByName} from '../controler/productconroler.js'
const productrouter=express.Router();


productrouter.get('/',getProducts)
productrouter.get('/:name',getProductByName)
productrouter.delete("/:productid", removeProduct);

productrouter.post('/',addProduct)
   
    
export default productrouter;  
    