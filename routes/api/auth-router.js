const express = require('express');

const { schemas } = require('../../models/user');

const ctrl = require("../../controllers/auth-controller");

const { validateBody,isEmptyBody } = require("../../middlewares/");


const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, validateBody(schemas.registerSchema), ctrl.register)



module.exports = authRouter;