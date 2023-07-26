const express = require('express');

const authRouter = express.Router();
const { schemas } = require('../../models/user');
const ctrl = require("../../controllers/auth-controller");

const { validateBody} = require("../../middlewares");

authRouter.post('/signup', validateBody(schemas.registerSchema), ctrl.register)



module.exports = authRouter;