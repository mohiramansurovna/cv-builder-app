const express = require('express');
const experienceRouter = express.Router();
const db = require('../../../models/db');
const { validationResult } = require('express-validator');
const { experienceValidator } = require('../../../validators');
const controllers = require('../../../controllers/experience');
experienceRouter.post('/', experienceValidator, async(req, res) => {

    //start with validating
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(401).send(errors.array()[0].msg);
    }
    const data = await controllers.put(req.body);
    if (!data) {
        return res.status(400).send('Failed to add experience');
    }
    res.status(200).json(data)
})

experienceRouter.delete('/:id', async(req, res) => {
    const data =await controllers.delete(req.params.id);
    if (!data) {
        return res.status(400).send('Failed to delete experience');
    }
    res.status(200).send('Experience deleted successfully')
})

experienceRouter.put('/', experienceValidator, async(req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(401).send(errors.array()[0].msg);
    }
    const data=await controllers.update(req.body);
    if(!data) {
        return res.status(400).send('Failed to update experience');
    }
    res.status(200).json(data);
   })
module.exports = experienceRouter;