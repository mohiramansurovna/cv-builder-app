const db = require('../models/db');
const getUserData = async (user, title) => {
    let userData = {
        profile: [],
        experience: [],
        skills: [],
        education: [],
        language: [],
    }
    try {
        userData.profile = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM profile WHERE user_id = ?', [user.id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        })

        userData.experience = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM experiences WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        userData.skills = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM skills WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        userData.education = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM education WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        userData.language = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM languages WHERE user_id = ?', [user.id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    } catch (err) {
        console.error(err);
        return null;
    }
    return {
        title,
        user,
        profile: userData.profile,
        experience: userData.experience,
        skills: userData.skills,
        education: userData.education,
        language: userData.language,
        settings: false
    }
}

module.exports=getUserData
