// require mongoose
const mongoose = require("mongoose")
const isEmail = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
// go to the index.js file
// create schema
const usersSchema = new mongoose.Schema({
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => {
                return isEmail(val);
            },
            message: `{value} is not valid email`,
        },
    },
    flag: {
        type: Boolean,
        // required: true,
        default: false
    },
    fn: {
        type: String,
        required: true,
        // minLength:3,
        // maxLength:50,
        trim:true
    },
    ln: {
        type: String,
        required: true,
        // minLength:3,
        // maxLength:50,
        trim:true
    },
    password: {
        type: String,
        required: true,
    }
})
    usersSchema.method("genAuthToken" ,()=>{
    return jwt.sign({userId: `${this._id}`}, "myJsonWebTokenSecretKeyIsHere")
})
// create model
const Users = mongoose.model("users",usersSchema)
// export model
module.exports = Users
