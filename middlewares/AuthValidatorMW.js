const validator = require("../util/AuthValidator")

module.exports = (req,res,nxt)=>{
    let valid = validator(req.body)
    if (valid){
        req.vlaid = 1
        nxt()
    }else {
        res.status(403).send("Forbidden command")
    }
}
