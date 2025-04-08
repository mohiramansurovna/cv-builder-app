const express = require('express');
const skillsRouter = express.Router();
const { validationResult } = require('express-validator');
const { skillsValidator } = require('../../../validators');
const controllers = require('../../../controllers/skills');

skillsRouter.post('/', skillsValidator, async(req, res) => {
    //start with validating
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    const data=await controllers.post(req.body);
    if (!data) {
        return res.status(500).send('Internal DataBase Error');
    }
    return res.status(200).json(data);

    
})

skillsRouter.delete('/:id', async(req, res) => {
    const data=await controllers.delete(req.params.id);
    if (!data) {
        return res.status(500).send('Internal DataBase Error');
    }
    return res.status(200).json(data);
})


skillsRouter.put('/', skillsValidator, async(req, res) => {
   const data=await controllers.update(req.body);
    if (!data) {
        return res.status(500).send('Internal DataBase Error');
    }
    return res.status(200).json(data);
})
module.exports = skillsRouter;