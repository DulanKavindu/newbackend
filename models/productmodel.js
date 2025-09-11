import mongoose from "mongoose";

const productsheema = mongoose.Schema({
    productid:{
        type: String,
        required: true,
        unique: true
       
    },
    productname:{
        type: String,
        required: true
    },
    altname:[
        {type: String

        }
    ],
    image:[
        {type: String
            

        }
    ],
    price:{
        type: String,
        required: true
    },
    lasprice:{
        type: String,
        required: true
    },
    stock:{
        type: String,
        required: true

    },
    describtion:{
        type: String,
        required: true
    }
})
const product = mongoose.model("products",productsheema);
export default product;