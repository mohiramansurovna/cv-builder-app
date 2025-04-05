const express = require('express');
const userRouter = require('./user');
const apiRouter = require('./api');
const router = express.Router();
router.use('/user', userRouter);
router.use('/api',apiRouter);
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render('../views/index.ejs', {user:null, title:'Home'});
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.render('../views/index.ejs', {user:null, title:'Home'});
            return;
        }
        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
        res.cookie('token',newToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
        })
        res.redirect('/user/' + decoded.id);
    });
})

module.exports = router;