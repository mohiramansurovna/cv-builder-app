const { v4 } = require('uuid');
const db = require('../models/db.js');

const postEducation = async (data) => {
    const id = v4();
    const { user_id, degree, field_of_study, institution, location, start_date, end_date, description } = data;
    const sql = `INSERT INTO education (id, user_id, degree, field_of_study, institution, location, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, user_id, degree, field_of_study, institution, location, start_date, end_date, description];

    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        })

        return {
            id,
            user_id,
            degree,
            field_of_study,
            institution,
            location,
            start_date,
            end_date,
            description
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const deleteEducation = async (id) => {
    const sql = `DELETE FROM education WHERE id = ?`;
    try {
        await new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) {
                    return reject(err);
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
const updateEducation = async (data) => {
    const { id, user_id, degree, field_of_study, institution, location, start_date, end_date, description } = data;
    const sql = `UPDATE education SET user_id = ?, degree = ?, field_of_study = ?, institution = ?, location = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?`;
    const params = [user_id, degree, field_of_study, institution, location, start_date, end_date, description, id];

    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        })
        return {
            id,
            user_id,
            degree,
            field_of_study,
            institution,
            location,
            start_date,
            end_date,
            description
        };
    } catch (err) {
        console.error(err.message);
        return false;
    }
}
module.exports = {
    post: postEducation,
    delete: deleteEducation,
    update: updateEducation
}