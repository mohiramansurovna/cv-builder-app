// routes/api/user.js

const express = require('express');
const apiRouter = express.Router();
const registerRouter = require('./api/register');
const loginRouter = require('./api/login');
apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
module.exports = apiRouter;
