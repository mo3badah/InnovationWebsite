const Innovation = require("../models/InnovationModelDB")
// create Innovation
let addNewInnovation = async (req,res)=>{
    try{
        let innov = await new Innovation({
            TotalTimeInvested: req.body.TotalTimeInvested,
            avrHourWorkMonthly: req.body.avrHourWorkMonthly,
            avrPeopleCostMonthly: req.body.avrPeopleCostMonthly,
            currentMoneyCostMonthly: req.body.currentMoneyCostMonthly,
            currentTimeCostMonthly: req.body.currentTimeCostMonthly,
            deployCost: req.body.deployCost,
            deployTimePerHours: req.body.deployTimePerHours,
            description: req.body.description,
            name: req.body.name,
            pricePerPiece: req.body.pricePerPiece,
            productsNumbers: req.body.productsNumbers,
        })
        await innov.save()
        res.redirect("/dashboard");
    }catch (err) {
        for (let e in err.errors){
            console.log(err.errors[e].message)
        }
        res.status(400).send("bad request... some field is missed " +
            "\n while adding new innovation.")
    }
}
// get Innovation by name
let getInnovationByName = async (req,res)=>{
    try{
        let innov = await Innovation.findOne({name: req.params.name})
        if (!innov) return res.status(404).send(`Innovation with name ${req.params.name} is not found`)
        res.send(innov)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send("this innovation with this name is not found")
    }
}
// get all Innovations
let getAllInnovations = async (req,res)=>{
    try{
        let innov = await Innovation.find({})
        if (!innov) return res.status(404).send("Innovations data are not found...")
        res.send(innov)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send("Innovations data are not found...")
    }

}

// update Innovation
let updatedInnovation = async (req,res)=>{
    try{
        let updInnov = await Innovation.findOneAndUpdate({name: req.params.name},req.body,{returnOriginal:false})
        if (!updInnov) return res.status(404).send(`Innovation with name ${req.params.name} is not found to be updated`)
        res.send(updInnov)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send(`Innovation with name ${req.params.name} is not found to be updated`)
    }
}
// delete Innovation
let deletedInnovationByName = async (req,res)=>{
    try{
        let delInnov = await Innovation.findOneAndRemove({name: req.params.name})
        if (!delInnov) return res.status(404).send(`Innovation with name ${req.params.name} is not found to be deleted`)
        res.send(`deleted successfully : ` + delInnov)
    }catch (e) {
        for(let err in e.errors){
            console.log(e.errors[err].message)
        }
        res.status(404).send(`Innovation with name ${req.params.name} is not found to be deleted`)
    }
}

// export all modules
module.exports = {
   getAllInnovations,
    addNewInnovation,
    getInnovationByName,
    updatedInnovation,
    deletedInnovationByName
}
