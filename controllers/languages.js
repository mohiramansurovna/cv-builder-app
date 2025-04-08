const { v4 } = require('uuid');
const db = require('../models/db');
const putLanguages = async (data) => {
    const id = v4();
    const { user_id, language_name, language_level } = data;
    const sql = `INSERT INTO languages (id, user_id, language_name, language_level) VALUES (?, ?, ?, ?)`;
    const params = [id, user_id, language_name, language_level];

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
            language_name,
            language_level
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const deleteLanguages = async (id) => {
    const sql = `DELETE FROM languages WHERE id = ?`;
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

const updateLanguages = async (data) => {
    const { id, user_id, language_name, language_level } = data;
    const sql = `UPDATE languages SET user_id = ?, language_name = ?, language_level = ? WHERE id = ?`;
    const params = [user_id, language_name, language_level, id];

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
            language_name,
            language_level
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

module.exports = {
    put: putLanguages,
    delete: deleteLanguages,
    update: updateLanguages
}