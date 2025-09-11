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
export async function addUser(req, res) {
    try {
        const newdata = req.body;

        // Admin user check
        if (newdata.type === 'admin') {
            if (!req.user) {
                return res.status(401).json({ message: 'First you have to login' });
            }
            if (req.user.type !== 'admin') {
                return res.status(403).json({ message: 'Only admin can add another admin' });
            }
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(newdata.password, 10);
        newdata.password = hashedPassword;

        // Create and save new user
        const newuser = new user(newdata);
        await newuser.save();

        res.json({ message: 'User added successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error in adding user', error: err });
    }
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
                 type:userdata.type,
                 profilePic:userdata.profilePic,
            },process.env.SKEY,)
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
export function isaddmin(req){
    if(req.user==null){
        
        return false
       }
    if(req.user.type!="admin"){
        
        return false

       } 
       return true  
}
export function iscustomer(req){
    if(req.user==null){
        return false
       }
    if(req.user.type!="customer"){   
        return false
    }
    return true
}

export default {getUsers,addUser,loginUser,isaddmin,iscustomer};  

//"email": "john.doe@example.com2",  "password": "Password123!" admin 