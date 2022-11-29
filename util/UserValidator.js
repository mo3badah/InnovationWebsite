const Ajv = require("ajv").default
const ajv = new Ajv()
// making schema
const schema = {
    "type": "object",
    "properties":{
        "fn":{"type":"string", "pattern":"^[A-Za-z][a-z]*$"},
        "ln":{"type":"string", "pattern":"^[A-Za-z][a-z]*$"},
        "email":{"type":"string", "pattern":".+@.+\..+"},
        "password":{"type":"string"},
        "age": {"type": "number"},
        "flag": {"type": "boolean"}
    },
    "required":["fn","ln","email","password"]
}
const validator = ajv.compile(schema)
module.exports = validator
