const express = require("express")
const router = express.Router()
const validator = require("../middlewares/UsersValidatorMW")
const {postNewUser, getAllUsers, addNewUserFromAdmin, updateToAdminUser, updateToUser, deleteUser} = require("../controllers/UsersControllerDB");

// Registration route handler
// 1. we get the route to make a new user
// 2. we check validation of the data which sent to us from the form and try to make it ready
router.post("/",validator,postNewUser)
router.get("/",getAllUsers)
router.post("/addNewUserFromAdmin",validator,addNewUserFromAdmin)
router.post("/updateToAdminUser",updateToAdminUser)
router.post("/updateToUser",updateToUser)
router.delete("/deleteUser/:email",deleteUser)

module.exports = router
