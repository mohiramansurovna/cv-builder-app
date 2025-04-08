const express = require('express');
const { validationResult } = require('express-validator');
const { registerValidator } = require('../../../validators.js');
const registerRouter = express.Router();
const db = require('../../../models/db.js');
const { v4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
registerRouter.post('/', registerValidator, async (req, res) => {
    if (!req.body) {
        return res.status(400).send('No data provided');
    }
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send("Walidation errors");
    }
    const { first_name, last_name, email, password, phone, address } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const existingUser = new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row && row.email === email) reject(new Error('User already exists'));
                resolve();
            }
        });
    })

    await existingUser.then(() => {
        const userId = v4()
        db.run('INSERT INTO users ( id ,first_name, last_name, email, password, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, first_name, last_name, email, hashedPassword, phone, address], function (err) {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }
            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            })
            res.status(200).json({ id: userId});

        });
    }).catch((err) => {
        res.status(400).send(err.message);
    })

});
module.exports = registerRouter;