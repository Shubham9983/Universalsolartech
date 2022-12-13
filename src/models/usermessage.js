const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        minLength:3
    },
    lastname:{
        type:String,
        require:true,
        minLength:3
    },
    email:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id");
            }
        }
    },
    phone:{
        type:Number,
        require:true,
        min:10
    },
    password:{
        type:String,
        require:true,
        minLength:4
    },

})

// we need a collection

const User = mongoose.model("User", userSchema);


module.exports = User;