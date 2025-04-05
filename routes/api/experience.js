const express = require('express');
const experienceRouter = express.Router();
const db = require('../../models/db');
const { validationResult } = require('express-validator');
const { experienceValidator } = require('../../validators');
const { v4 } = require('uuid');

experienceRouter.post('/', experienceValidator, (req, res) => {

    //start with validating
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().join("\n"));
    }
    
    const id= v4();
    //deconstructuring the body
    const { user_id, job_title, company_name, start_date, end_date, description } = req.body;
    const sql = `INSERT INTO experiences (id, user_id, job_title, company_name, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, user_id, job_title, company_name, start_date, end_date, description];

    try {
        db.run(sql, params, function (err) {
            if (err) {
                console.log(err.message);
                return res.status(500).send('Failed to add experience');
            }
            return res.status(200).json({
                id,
                user_id,
                job_title,
                company_name,
                start_date,
                end_date,
                description
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})

experienceRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM experiences WHERE id = ?`;
    try {

        db.run(sql, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to delete experience');
            }
            return res.status(200).send('Experience deleted successfully');
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})

experienceRouter.put('/:id', experienceValidator, (req, res) => {
    const { id } = req.params;
    const { user_id, job_title, company_name, start_date, end_date, description } = req.body;
    const sql = `UPDATE experiences SET user_id = ?, job_title = ?, company_name = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?`;
    const params = [user_id, job_title, company_name, start_date, end_date, description, id];

    try {
        db.run(sql, params, function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to update experience');
            }
            return res.status(200).json({
                id,
                user_id,
                job_title,
                company_name,
                start_date,
                end_date,
                description
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})
module.exports = experienceRouter;