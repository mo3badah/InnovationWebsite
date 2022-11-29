const User = require("../models/UsersModelDB")
const bcrypt = require("bcrypt")
const path = require("path")
const jwt = require("jsonwebtoken");
const querystring = require('querystring');
const express = require("express");
let login = async (req, res) =>{
    try{
        // check email
        let user = await User.findOne({email: req.body.email}).exec()
        if (!user) return  res.status(400).send("Invalid Email or Password please try again")
        // check password
        const validPswd = await bcrypt.compare(req.body.password, user.password)
        if (!validPswd) return  res.status(400).send("Invalid Email or Password...")
        const token = jwt.sign({userId: `${user._id}`, adminRole: user.flag}, "myJsonWebTokenSecretKeyIsHere")
        // send response
        res.header("x-auth-token", token)
        const query = {
            "fn": user.fn,
            "ln": user.ln,
            "admin":user.flag
        }
        for (let propName in query) {
            res.cookie(propName, query[propName],2*24*60*60)
        }
        res.redirect('/dashboard');
    }catch (e) {
        console.log("there is some errors on the config file configuration :"+e)
    }
}



module.exports = {
    login
}
