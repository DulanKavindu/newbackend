
import mongoose from 'mongoose';
const studentSchema= new mongoose.Schema({
    name:String,
    age:Number,
    gender:String
})
const student = mongoose.model('student',studentSchema);
export default student;