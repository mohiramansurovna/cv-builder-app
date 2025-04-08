const express = require('express');
const languageRouter = express.Router();

const { validationResult } = require('express-validator');
const { languageValidator } = require('../../../validators');
const controllers = require('../../../controllers/languages');

languageRouter.post('/', languageValidator,async (req, res) => {
    //validation part
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    const data=await controllers.put(req.body);
    if (!data) {
        return res.status(500).send('Failed to insert language');
    }
    res.status(200).json(data);
})

languageRouter.delete('/:id', async(req, res) => {
    const data=await controllers.delete(req.params.id);
    if (!data) {
        return res.status(500).send('Internal DataBase Error');
    }
    res.status(200).send('Language deleted successfully');
})

languageRouter.put('/', languageValidator ,async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    const data=await controllers.update(req.body);
    if (!data) {
        return res.status(500).send('Failed to update language');
    }
    res.status(200).json(data);
})
module.exports = languageRouter;