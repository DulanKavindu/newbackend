import mongoose from "mongoose";

const userschema = mongoose.Schema({
     email: {
    type: String,
    required: true, 
    unique: true,           
    
  },
  firstName: {
    type: String,
    required: true, 
   
  },
  lastName: {
    type: String,
    required: true, 
  
  },
  password: {
    type: String,
    required: true, 
    
  },
  isBlock: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "customer"
   
  },
  profilePic: {
    type: String, // store URL or path
    default: "https://static.vecteezy.com/system/resources/previews/032/176/191/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
  }

})
const user = mongoose.model('user', userschema);
export default user;