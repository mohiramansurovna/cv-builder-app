const express= require('express');
const educationRouter=express.Router();
const db = require('../../../models/db');
const {validationResult } = require('express-validator');
const { educationValidator } = require('../../../validators');
const controllers=require("../../../controllers/education")

educationRouter.post('/',educationValidator, async(req, res) => {

    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

    const data=await controllers.post(req.body);

    if(!data) return res.status(500).send('Internal Server Error');
    return res.status(200).json(data);

})

educationRouter.delete('/:id',(req,res)=>{

    const data=controllers.delete(req.params.id);
    if(!data) return res.status(500).send('Internal Server Error');
    return res.status(200).send('Deleted');
})

educationRouter.put('/',educationValidator,async(req,res)=>{
    
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    const data=await controllers.update(req.body);
    if(!data) return res.status(500).send('Internal Server Error');
    
    return res.status(200).json(data);
})
module.exports = educationRouter;