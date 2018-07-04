
const mongoose = require("mongoose");

const userSchema = {
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    isAdmin: {
        // whether it's donor or delievers
        required:true,
        type: Boolean
    }
}

const User = mongoose.model("User", userSchema);
 
module.exports = User;