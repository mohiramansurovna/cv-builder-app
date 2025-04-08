const express = require('express');
const profileRouter = express.Router();
const db = require('../../../models/db');
const { validationResult } = require('express-validator');
const { profileValidator } = require('../../../validators');
const controllers = require('../../../controllers/profile.js');

profileRouter.post('/', profileValidator ,async (req, res) => {

    //start with validating
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    
    const data=await controllers.post(req.body);
    if (!data) {
        return res.status(500).send('Failed to create profile');
    }
    return res.status(200).json(data);
})

profileRouter.delete('/:id', async(req, res) => {
   const data=await controllers.delete(req.params.id);
    if (!data) {
         return res.status(500).send('Failed to delete profile');
    }
    return res.status(200).send('Profile deleted successfully');
})

profileRouter.put('/', profileValidator, async(req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    const data=await controllers.update(req.body);
    if (!data) {
        return res.status(500).send('Failed to update profile');
    }
    return res.status(200).json(data);
})
module.exports = profileRouter;