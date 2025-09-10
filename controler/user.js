import user from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import  JsonWebToken from "jsonwebtoken";

export function getUsers(req,res){
    user.find().then((users)=>{
        res.json({
            message:'Users fetched successfully',
            users:users})
    }).catch((err)=>{
        res.json({
            message:'Error in fetching users',
            error:err})
    })}
export function addUser (req,res){
    const newdata= req.body;
     newdata.password=bcrypt.hashSync(newdata.password,10)


   const newuser=new user(newdata)

   newuser.save().then(()=>{
        res.json({
            message:'User added successfully'})      
}).catch((err)=>{
        res.json({
            message:'Error in adding user',
            error:err})
    }   )
    
   } 
   
export function loginUser(req,res){
   user.findOne({email:req.body.email}).then((userdata)=>{
    if(userdata.lenght===0){
        res.json({message:'User not found'})
    }
    else{
        const passwordmatch=bcrypt.compareSync(req.body.password,userdata.password)
        if(passwordmatch){
            const token=JsonWebToken.sign({
                email:userdata.email,
                 firstName:userdata.firstName,
                 lastName:userdata.lastName,
                 isBlock:userdata.isBlock,
                 profilePic:userdata.profilePic,
            },"cbc-key2580")
            res.json({
                message:'Login successful',
                token:token,})
        }
        else{
            res.json({message:'Invalid password'})
        }
   }
} 
)}
export default {getUsers,addUser,loginUser};  