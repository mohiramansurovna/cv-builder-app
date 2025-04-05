// routes/api/user.js

const express = require('express');
const userRouter = express.Router();
const db = require('../models/db.js');
const authMiddleware = require("../authMiddleware.js")


userRouter.get('/register', (req, res) => {
    res.render('register.ejs', { title: "Register", user: null });
});

userRouter.get('/login', (req, res) => {
    res.render('login.ejs', { title: "Login", user: null });
})

const sendUser = async (user, res) => {
    let userData = {
        experiences: [],
        skills: [],
        education: [],
        certifications: [],
        languages: [],
        personal_projects: []
    }
    try {
        userData.experiences = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM experiences WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        userData.skills = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM skills WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        userData.education = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM education WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        userData.languages = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM languages WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
    res.render('user.ejs', {
        title: "User",
        user,
        experience: userData.experiences,
        skills: userData.skills,
        education: userData.education,
        certifications: userData.certifications,
        languages: userData.languages,
        personal_projects: userData.personal_projects
    });
}

userRouter.get('/:id', authMiddleware, (req, res) => {
    if (!req.params.id) {
        return res.status(400).send('No user id provided');
    }
    try {
        db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500);
            }
            if (!row) {
                return res.render('index.ejs',{
                    title: "Home",
                    user: null,
                });
            }
            return sendUser(row, res)

        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
})
module.exports = userRouter;
