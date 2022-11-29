const Ajv = require("ajv").default
const ajv = new Ajv()
// making schema
const schema = {
    "type": "object",
    "properties":{
        "email":{"type":"string", "pattern":".+@.+\..+"},
        "password":{"type":"string"}
    },
    "required":["email","password"]
}
const validator = ajv.compile(schema)
module.exports = validator
