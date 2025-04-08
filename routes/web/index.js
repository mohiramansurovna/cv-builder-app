const webRouter = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const templateRouter = require('./templates');
const authMiddleware = require('../../authMiddleware');

webRouter.use('/auth', authRouter);
webRouter.use('/user',authMiddleware, userRouter);
webRouter.use('/templates', authMiddleware, templateRouter)
webRouter.get('/', authMiddleware,(req, res) => {
    redirect('/user/');
});
module.exports = webRouter;