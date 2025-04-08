const express = require('express');
const settingsRouter = express.Router();
const db = require('../../../models/db');
const { validationResult } = require('express-validator');
const { settingsValidator } = require('../../../validators');
const controllers=require('../../../controllers/settings');
settingsRouter.put('/', settingsValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).send(errors.array()[0].msg);
    }

    const data=await controllers.put(req.body);
    if (!data) {
        return res.status(500).send('Internal DataBase Error');
    }
    res.status(200).json(data)
    
})
module.exports = settingsRouter;