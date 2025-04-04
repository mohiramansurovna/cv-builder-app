const express = require('express');
const { validationResult } = require('express-validator');
const { loginValidator } = require('../../validators.js');
const loginRouter = express.Router();
const db = require('../../models/db.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

loginRouter.post('/', loginValidator, async (req, res) => {
    if (!req.body) {
        return res.status(400).send('No data provided');
    }
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send("Validation errors");
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    try {
        db.get('SELECT * FROM users WHERE email=?', [email], function (err, row) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (!row) {
                return res.status(404).send('User not found');
            }

            bcryptjs.compare(password, row.password, function (err, result) {
                if (err) {
                    return res.status(500).send('Internal Server Error');
                }
                if (!result) {
                    return res.status(401).send('Invalid password');
                }
                const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
                res.cookie('token', token, {
                    httpOnly:true,
                    secure:false,
                    sameSite:'lax',
                })
                return res.status(200).json({id:row.id});
            });
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
})
module.exports = loginRouter;