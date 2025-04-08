const { v4 } = require('uuid');
const db = require('../models/db');

const putExperience = async (data) => {
    const id = v4();
    const { user_id, job_title, company_name, start_date, end_date, description } = data;
    const sql = `INSERT INTO experiences (id, user_id, job_title, company_name, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, user_id, job_title, company_name, start_date, end_date, description];
    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
                
            })
        })
        return {
            id,
            user_id,
            job_title,
            company_name,
            start_date,
            end_date,
            description
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const deleteExperience = async (id) => {
    const sql = `DELETE FROM experiences WHERE id = ?`;
    try {
        await new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        })
        return true;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}
const updateExperience = async (data) => {
    const { id, user_id, job_title, company_name, start_date, end_date, description } = data;
    const sql = `UPDATE experiences SET user_id = ?, job_title = ?, company_name = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?`;
    const params = [user_id, job_title, company_name, start_date, end_date, description, id];

    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        })

        return {
            id,
            user_id,
            job_title,
            company_name,
            start_date,
            end_date,
            description
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

module.exports = {
    put: putExperience,
    delete: deleteExperience,
    update: updateExperience
}