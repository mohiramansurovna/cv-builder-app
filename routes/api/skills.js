const express = require('express');
const skillsRouter = express.Router();
const db = require('../../models/db');
const { validationResult } = require('express-validator');
const { skillsValidator } = require('../../validators');
const { v4 } = require('uuid');

skillsRouter.post('/', skillsValidator, (req, res) => {

    //start with validating
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().join("\n"));
    }

    const id = v4()
    //deconstructuring the body
    const { user_id, skill_name, skill_level } = req.body;
    const sql = `INSERT INTO skills (id, user_id, skill_name, skill_level) VALUES (?, ?, ?, ?)`;
    const params = [id, user_id, skill_name, skill_level];

    try {
        db.run(sql, params, function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to add skill');
            }
            return res.status(200).json({
                id,
                user_id,
                skill_name,
                skill_level
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})

skillsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM skills WHERE id = ?`;
    try {

        db.run(sql, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to delete skill');
            }
            return res.status(200).send('Skill deleted successfully');
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})

skillsRouter.put('/:id', skillsValidator, (req, res) => {
    const { id } = req.params;
    const { user_id, skill_name, skill_level } = req.body;
    const sql = `UPDATE skills SET user_id = ?, skill_name = ?, skill_level = ? WHERE id = ?`;
    const params = [user_id, skill_name, skill_level, id];

    try {
        db.run(sql, params, function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to update skill');
            }
            return res.status(200).json({
                id,
                user_id,
                skill_name,
                skill_level
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Internal DataBase Error');
    }
})
module.exports = skillsRouter;