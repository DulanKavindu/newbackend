
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

export async function removeProduct(req, res) {
  try {
    // 🔐 Check admin
    if ( !isaddmin) {
      return res.status(403).json({
        message: "Please log in as an admin to delete a product",
      });
    }

    // 🆔 Get product ID from route params
    const productid = req.params.productid;

  console.log(productid)

    // 🗑️ Delete product (use productid OR _id depending on schema)
    const result = await product.deleteOne({ productid: productid });
    // 👉 if you are using MongoDB _id:
    // const result = await product.deleteOne({ _id: productid });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "✅ Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Error in deleting product",
      error: err.message,
    });
  }
}


        
export async function getProductById(req, res) {
  try {
    const productId = req.params.id;

    
    const product = await Product.findOne({ productid: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export function updateproduct(req,res){
  if(!isaddmin){
    res.json({
      massage:"to upadete a product you have to login as an admin"
    })
    return
  }
  const produtid=req.params.productid;
  const newdata=req.body 
  product.updateOne({produtid:produtid},newdata).then(()=>{
    res.json({
      massage:"product update ok"
    })
  }).catch((err)=>{
    res.json({
      error:err
    })
  })

}  
    
export default {getProducts,addProduct,removeProduct, getProductById,updateproduct};