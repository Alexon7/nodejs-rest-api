const { User } = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { RequestError } = require("../helpers/index");
const { crtlWrapper } = require("../helpers/index");


const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({email, password: hashPassword});
    res.status(201).json({
        user: {
      email: result.email,
      subscription: result.subscription,
    },
    })
}

const login = async (req, res) => {
     const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(401, "Email or password is wrong"); 
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw RequestError(401, "Email or password is wrong");
    }
    const payload = {
        _id: user._id
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
         user: { email: user.email, subscription: user.subscription },
    });
}

module.exports = {
    register: crtlWrapper(register),
    login: crtlWrapper(login),
};