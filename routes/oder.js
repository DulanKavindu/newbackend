import { createoder } from "../controler/oder.js";

import express from "express";

const oderrouter=express.Router();

oderrouter.post('/',createoder)

export default oderrouter;