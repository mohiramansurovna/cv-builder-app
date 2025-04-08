const userRouter= require('express').Router();

const educationRouter = require('./education');
const experienceRouter = require('./experience');
const profileRouter = require('./profile');
const skillsRouter = require('./skills');
const languageRouter = require('./language');
const settingsRouter = require('./settings');

userRouter.use('/education', educationRouter);
userRouter.use('/experience', experienceRouter);
userRouter.use('/profile', profileRouter);
userRouter.use('/skills', skillsRouter);
userRouter.use('/language', languageRouter);
userRouter.use('/settings', settingsRouter);

module.exports = userRouter;