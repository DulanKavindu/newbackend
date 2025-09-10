import express from 'express';
import student from '../models/studentmodel.js';
import { getStudents, addStudent,removestudent } from '../controler/studentcontroler.js';


const studentRouter= express.Router();
studentRouter.get('/',getStudents)
 studentRouter.post('/',addStudent)
 studentRouter.delete('/',removestudent)
export default studentRouter;
