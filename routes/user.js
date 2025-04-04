// routes/api/user.js

const express = require('express');
const userRouter = express.Router();
const db = require('../models/db.js');
const authMiddleware=require("../authMiddleware.js")


userRouter.get('/register', (req,res)=>{
    res.render('register.ejs', { title: "Register", user:null });
});

userRouter.get('/login', (req,res)=>{
    res.render('login.ejs', { title: "Login" , user:null});
})

userRouter.get('/:id',authMiddleware, (req,res)=>{
    if(!req.params.id){
        return res.status(400).send('No user id provided');
    }
    try{
        db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500);
            }
            if (!row) {
                return res.status(404).send('User not found');
            }
            res.render('user.ejs', { user: row, title:"Dashboard" });
        });
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
})
module.exports = userRouter;
