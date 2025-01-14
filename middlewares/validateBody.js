const { RequestError } = require("../helpers/");

const validateBody = (contactSchema) => {
    const func = (req, res, next) => {
        const { error } = contactSchema.validate(req.body, { abortEarly: false });
               const emptyField = !Object.keys(req.body).length;
         
        if (emptyField) {
            throw RequestError(400, "missing fields")
        }
        if (error) {
            
            throw (RequestError(400, error.message))
        }
        next();
    };
    return func;
}

module.exports = validateBody;







