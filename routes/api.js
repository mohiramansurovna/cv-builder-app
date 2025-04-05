// routes/api/user.js

const express = require('express');
const apiRouter = express.Router();
const registerRouter = require('./api/register');
const loginRouter = require('./api/login');
const educationRouter = require('./api/education');
const experienceRouter = require('./api/experience');
const skillsRouter = require('./api/skills');
apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/education', educationRouter);
apiRouter.use('/experience', experienceRouter);
apiRouter.use('/skills', skillsRouter);
module.exports = apiRouter;
