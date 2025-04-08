const router=require('express').Router();
const apiRouter = require('./api');
const webRouter = require('./web');

router.use('/api', apiRouter);
router.use('/', webRouter);

module.exports=router;

