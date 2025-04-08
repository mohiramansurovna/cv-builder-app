const db = require('../models/db');
const { v4 } = require('uuid');
const postSkills = async (data) => {
    const id = v4()
    const { user_id, skill_name, skill_level } = data;
    const sql = `INSERT INTO skills (id, user_id, skill_name, skill_level) VALUES (?, ?, ?, ?)`;
    const params = [id, user_id, skill_name, skill_level];
    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return {
            id,
            user_id,
            skill_name,
            skill_level
        };
    } catch (err) {
        console.error(err.message);
        return null;
    }
}
const deleteSkills = async (id) => {
    const sql = `DELETE FROM skills WHERE id = ?`;
    try {
        await new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return true;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const updateSkills = async (data) => {
    const { id, user_id, skill_name, skill_level } = data;
    const sql = `UPDATE skills SET user_id = ?, skill_name = ?, skill_level = ? WHERE id = ?`;
    const params = [user_id, skill_name, skill_level, id];

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
            skill_name,
            skill_level
        }

    } catch (err) {
        console.error(err.message);
        return null;
    }
}
module.exports = {
    post: postSkills,
    delete: deleteSkills,
    update: updateSkills
}