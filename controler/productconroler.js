
import product from "../models/productmodel.js";
import { isaddmin,iscustomer } from "./user.js";

export function getProducts(req,res){
    product.find().then((products)=>{
        res.json({
            message:'Products  successfully',
            products:products})
    }).catch((err)=>{
        res.json({
            message:'Error in fetching products',
            error:err})
    })}

export function addProduct (req,res){
    console.log(req.user)
   if(req.user==null){
    res.json({
        massage:"user not login"
    })
    return
   }
    if(req.user.type!="admin"){
    res.json({ 
        massage:"user not admin"
    })
    return
   }
   const newproduct=new product(req.body)
   
   newproduct.save().then(()=>{
        res.json({
            message:'Product added successfully'})      
}).catch((err)=>{
        res.json({
            message:'Error in adding product',
            error:err})
    }   ) }

export function removeProduct(req,res){
    product.deleteOne({name:req.body.name}).then(()=>{
        res.json({
            message:'Product deleted successfully'}
        )}).catch((err)=>{res.json({
            message:'Error in deleting product',
            error:err})
        }) } 
        
export function getProductByName(req,res){
    const name = req.params.name
    product.find({name:name}).then((productlist)=>{
        res.json({
            message:'Product fetched successfully',
            products:productlist})
    }).catch((err)=>{
        res.json({
            message:'Error in fetching product',
            error:err})
    })
}        
export default {getProducts,addProduct,removeProduct,getProductByName};