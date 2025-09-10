import express from "express";
import {getUsers,addUser,loginUser} from '../controler/user.js'
const userrouter=express.Router();  
userrouter.get('/',getUsers)
userrouter.post('/',addUser) 
userrouter.post('/login',loginUser)   

export default userrouter;