const { v4 } = require('uuid');
const db = require('../models/db.js');

const postProfile = async (data) => {
    const id = v4();
    const { user_id, job_title, personal_statement, linkedin, github, portfolio } = data;
    const sql = `INSERT INTO profile (id, user_id, job_title, personal_statement, linkedin, github, portfolio) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, user_id, job_title, personal_statement, linkedin, github, portfolio];

    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        })

        return {
            id,
            user_id,
            job_title,
            personal_statement,
            linkedin,
            github,
            portfolio
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const deleteProfile = async (id) => {
    const sql = `DELETE FROM profile WHERE id = ?`;
    try {
        await new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        })
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

const updateProfile = async (data) => {
    const { id, user_id, job_title, personal_statement, linkedin, github, portfolio } = data;
    const sql = `UPDATE profile SET user_id = ?, job_title = ?, personal_statement = ?, linkedin = ?, github = ?, portfolio = ? WHERE id = ?`;
    const params = [user_id, job_title, personal_statement, linkedin, github, portfolio, id];

    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        })

        return {
            id,
            user_id,
            job_title,
            personal_statement,
            linkedin,
            github,
            portfolio
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}
module.exports = {
    post: postProfile,
    delete: deleteProfile,
    update: updateProfile
}
