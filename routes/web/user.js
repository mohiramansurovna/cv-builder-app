const express = require('express');
const userRouter = express.Router();
const getUserData=require('../../controllers/user.js')



userRouter.get('/', async(req, res) => {
    const userData =await getUserData(req.user, 'Home');
    
    if (!userData) return res.status(500).send('Internal Server Error');
    return res.render('user/index.ejs', userData);
})

userRouter.get('/settings', (req, res) => {
    return res.render('user/settings.ejs', { title: "Settings", user: req.user, settings: true });
})

module.exports = userRouter;
