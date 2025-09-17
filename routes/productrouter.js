import mongoose from "mongoose";
import express from "express";
import {getProducts,addProduct,removeProduct, getProductById, updateproduct} from '../controler/productconroler.js'
const productrouter=express.Router();


productrouter.get('/',getProducts)
productrouter.get('/:id', getProductById)
productrouter.delete("/:productid", removeProduct);

productrouter.post('/',addProduct)
productrouter.put("/:productid",updateproduct)

   
    
export default productrouter;  
    