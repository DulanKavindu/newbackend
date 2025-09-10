import student from "../models/studentmodel.js";

export function getStudents(req,res){
    student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        res.json({
            message:'Error in fetching students',
            error:err})
    })}


    
export function addStudent (req,res){
   const newstudent=new student({
    name:req.body.name,
    age:req.body.age,
    gender:req.body.gender
   })
    newstudent.save().then(()=>{
        res.json({
            message:'Student added successfully'})

    }).catch((err)=>{
        res.json({
            message:'Error in adding student',
            error:err})
    }) }

export function removestudent(req,res){
    student.deleteOne({name:req.body.name}).then(()=>{
        res.json({
            message:'Student deleted successfully'}
        )}).catch((err)=>{res.json({
            message:'Error in deleting student',
            error:err})
        }) }       

export default {getStudents,addStudent,removestudent}   