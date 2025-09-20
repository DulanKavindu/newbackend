import { createoder, getlastpricetooder } from "../controler/oder.js";

import express from "express";

const oderrouter=express.Router();

oderrouter.post('/',createoder)
oderrouter.post('/quote',getlastpricetooder)

export default oderrouter;