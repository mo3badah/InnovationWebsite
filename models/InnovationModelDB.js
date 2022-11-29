// require mongoose
const mongoose = require("mongoose")
// set connection
// go to the index.js file
// create schema
const innovationSchema = new mongoose.Schema({
    TotalTimeInvested: {
        type:Number,
    },
    avrHourWorkMonthly: {
        type:Number,
    },
    avrPeopleCostMonthly: {
        type:Number,
    },
    currentMoneyCostMonthly: {
        type:Number,
    },
    currentTimeCostMonthly: {
        type:Number,
    },
    deployCost: {
        type:Number,
    },
    deployTimePerHours: {
        type:Number,
    },
    description: {
        type: String,
    },
    name: {
        type: String,
    },
    pricePerPiece: {
        type:Number,
    },
    productsNumbers: {
        type:Number,
    }
})
// create model
const Innovation = mongoose.model("innovdetails",innovationSchema)
// export model
module.exports = Innovation
