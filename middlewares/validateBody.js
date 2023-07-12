const { RequestError } = require("../helpers");

const validateBody = contactSchema => {
    const func = (req, res, next) => {
        const { error } = contactSchema.validate(req.body); 
        const reqParam = contactSchema.validate(req.body);
        const emptyField = !Object.keys(req.body).length;
         
        if (emptyField) {
            throw RequestError(400,"missing fields")
        }
        if (error) {
          const paramError = reqParam.error.details[0].path[0];
           throw (RequestError(400, `missing required ${paramError} field`))
        }
       next() 
    }
    return func;
}

module.exports = validateBody;