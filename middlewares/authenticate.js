const jwt = require("jsonwebtoken");

const { User } = require('../models/user');
const { RequestError } = require("../helpers/index");

const {JWT_SECRET} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(RequestError(401))
    }
    try {
        const {_id} = jwt.verify(token, JWT_SECRET);
        const user = await User.findById({_id});
        if(!user || !user.token || user.token !== token){
            next(RequestError(401))
        }
        req.user = user;
        next()
    } catch (error) {
        next(RequestError(401));
    }

}

module.exports = authenticate;