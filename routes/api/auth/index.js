const authRouter = require('express').Router();
const loginRouter = require('./login');
const registerRouter = require('./register');

authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);

module.exports = authRouter;