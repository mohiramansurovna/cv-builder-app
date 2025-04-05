const express= require('express');
const educationRouter=express.Router();
const db = require('../../models/db');
const {validationResult } = require('express-validator');
const { educationValidator } = require('../../validators');
const { v4 } = require('uuid');

educationRouter.post('/',educationValidator, (req, res) => {

    //start with validating
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().join("\n"));
    }
    const id=v4();
    //deconstructuring the body
    const { user_id, degree, field_of_study, institution, location, start_date, end_date, description } = req.body;
    const sql = `INSERT INTO education (id, user_id, degree, field_of_study, institution, location, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, user_id, degree, field_of_study, institution, location, start_date, end_date, description];
    
    //adding to the database
    try{
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to add education' );
            }
            return res.status(200).json({
                id,
                user_id,
                degree,
                field_of_study,
                institution,
                location,
                start_date,
                end_date,
                description
            });
        });
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})

educationRouter.delete('/:id',(req,res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM education WHERE id = ?`;
    try{

        db.run(sql, [id], function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to delete education');
            }
            return res.status(200).send('Education deleted successfully');
        });
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})

educationRouter.put('/:id',educationValidator,(req,res)=>{
    const { id } = req.params;
    const { user_id, degree, field_of_study, institution, location, start_date, end_date, description } = req.body;
    const sql = `UPDATE education SET user_id = ?, degree = ?, field_of_study = ?, institution = ?, location = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?`;
    const params = [user_id, degree, field_of_study, institution, location, start_date, end_date, description, id];

    try{
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to update education');
            }
            return res.status(200).json({
                id,
                user_id,
                degree,
                field_of_study,
                institution,
                location,
                start_date,
                end_date,
                description
            });
        });
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})
module.exports = educationRouter;