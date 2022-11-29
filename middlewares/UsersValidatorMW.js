const validator = require("../util/UserValidator")

module.exports = (req,res,nxt)=>{
    req.body.password = req.body.password[0]
    req.body.flag = false
    req.body.age = +req.body.age
    let valid = validator(req.body)
    if (valid){
        req.vlaid = 1
        nxt()
    }else {
        res.status(403).send("Forbidden command... \n please review validation settings.")
    }
}
