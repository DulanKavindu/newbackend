import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRoute from './routes/studentroute.js';
import productrouter from './routes/productrouter.js';
import userrouter from './routes/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import oderrouter from './routes/oder.js';

const app = express();
dotenv.config();
const mongodburl=process.env.MONGO_DB_URL;
mongoose.connect(mongodburl,{})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token != null) {   // or just -> if(token)
    jwt.verify(token, process.env.SKEY, (err, decoded) => {
      if (!err) {
        req.user = decoded; // decoded payload set karanna
      } else {
        console.log("Invalid token");
      }
      next(); // verify async, so next() call karanna me athule
    });
  } else {
    console.log("No token provided");
    next();
  }
});

app.use('/students',studentRoute);
app.use('/products',productrouter);
app.use('/users',userrouter);
app.use('/orders',oderrouter);

app.listen(3000, 
    () => {
    console.log('Server is running on port 3000');}
)