const apiRouter = require('express').Router();
const userRouter = require('./user');
const authRouter = require('./auth');
const authMiddleware = require('../../authMiddleware.js');


apiRouter.use('/user', authMiddleware, userRouter);
apiRouter.use('/auth', authRouter);


module.exports = apiRouter;




