const express = require("express")
const router = express.Router()
const innovationsControllers = require("../controllers/InnovationControllerDB")
// get all innovation pre requests APIs
router.all(`/`,(req,res,next)=>{
    console.log(`Request Received on Innovation collection`)
    next()
})

// fetch all the innovations
router.get(`/`, innovationsControllers.getAllInnovations);

// post new innovation to innovation data
router.post(`/` , innovationsControllers.addNewInnovation);

// // parameter middleware
// router.param(`id`,studentsControllers.checkParams)

// delete existing innovation
router.delete(`/:name`, innovationsControllers.deletedInnovationByName)

// update existing innovation
router.put(`/:name`, innovationsControllers.updatedInnovation)

// get specific innovation data using url parameters
router.get(`/:name`, innovationsControllers.getInnovationByName);

module.exports = router
