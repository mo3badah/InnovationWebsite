const express = require("express")
const router = express.Router()
const {login} = require("../controllers/AuthControllerDB")
const validatorMW = require("../middlewares/AuthValidatorMW")
// login authentication
router.post("/",validatorMW, login)

module.exports = router
