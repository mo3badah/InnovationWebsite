// import user model of db
const  User  = require("../models/UsersModelDB");
const bcrypt = require("bcrypt");
const path = require("path")
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {json} = require("express");
const Innovation = require("../models/InnovationModelDB");


let postNewUser = async (req, res) => {
    // check if user founded or not
    try {
        let user = await User.findOne({email: req.body.email});
        if (user)
            return res
                .status(400)
                // .send(`user with this email: ${req.body.email} is already exist`)
                .redirect("/signup")

        let salt = await bcrypt.genSalt(10);
        let hashPswd = await bcrypt.hash(req.body.password, salt);
        let newUser = new User({
            fn: req.body.fn,
            ln: req.body.ln,
            age: req.body.age,
            flag: false,
            email: req.body.email,
            password: hashPswd
        });
        await newUser.save();
        const token = jwt.sign({userId: `${newUser._id}`, adminRole: newUser.flag}, "myJsonWebTokenSecretKeyIsHere")
        // send response
        res.header("x-auth-token", token)
        res.status(200).redirect("/dashboard")
            // .send(
            //     `Ok user: ${req.body.fn} ${req.body.ln} registered with email: ${req.body.email}`
            // );
    } catch (e) {
        for (let err in e.errors) {
            console.log(e.errors[err].message);
        }
        res.status(400).send(`Bad Request...`);
    }
};
let getAllUsers = async (req,res)=>{
    try{
        let users = await User.find({})
        if (!users) return res.status(404).send("Users data are not found...")
        res.send(users)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send("Users data are not found...")
    }
}
let addNewUserFromAdmin = async (req, res) => {
    // check if user founded or not
    try {
        let user = await User.findOne({email: req.body.email});
        if (user)
            return res
                .status(400)
                .send(`user with this email: ${req.body.email} is already exist`)

        let salt = await bcrypt.genSalt(10);
        let hashPswd = await bcrypt.hash(req.body.password, salt);
        let newUser = new User({
            fn: req.body.fn,
            ln: req.body.ln,
            age: req.body.age,
            flag: false,
            email: req.body.email,
            password: hashPswd
        });
        await newUser.save();
        // send response
        res.status(200)
        .send(
            newUser
        );
    } catch (e) {
        for (let err in e.errors) {
            console.log(e.errors[err].message);
        }
        res.status(400).send(`Can't Add user try again later...`);
    }
};
// update users
let updateToAdminUser = async (req,res)=>{
    try{
        let updUser = await User.updateOne({email: req.body.email}, {$set:{
            flag: true
            }},{returnOriginal:false})
        if (!updUser) return res.status(404).send(`User with email ${req.body.email} is not found to be updated`)
        res.send(updUser)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send(`User with email ${req.body.email} is not found to be updated`)
    }
}
let updateToUser = async (req,res)=>{
    try{
        let updUser = await User.updateOne({email: req.body.email}, {$set:{
                flag: false
            }},{returnOriginal:false})
        if (!updUser) return res.status(404).send(`User with email ${req.body.email} is not found to be updated`)
        res.send(updUser)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send(`User with email ${req.body.email} is not found to be updated`)
    }
}
// delete Innovation
let deleteUser = async (req,res)=>{
    try{
        let delUser = await User.findOneAndRemove({email: req.params.email})
        if (!delUser) return res.status(404).send(`user with email ${req.params.email} is not found to be deleted`)
        res.send(`deleted successfully : ` + delUser)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send(`user with email ${req.params.email} is not found to be deleted`)
    }
}
module.exports = {
    postNewUser,
    getAllUsers,
    addNewUserFromAdmin,
    updateToAdminUser,
    updateToUser,
    deleteUser
};
