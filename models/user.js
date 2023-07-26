const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, handleUpdateValidate } = require("./hooks");

const emailRegexp = require('../constants/user-constants');

const userSchema = new Schema({
    
    password: {
        type: String,
        minlength: 6,
    required: [true, 'Password is required'],
  },
  email: {
      type: String,
      match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },

}, { versionKey: false, timestamps: true });

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleMongooseError);
userSchema.post("findOneAndUpdate", handleMongooseError);



const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref("password"),
    subscription: Joi.string(),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
  schemas,
  }


