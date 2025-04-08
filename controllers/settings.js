const db = require('../models/db');

const putSettings = async (data) => {
    const { id, first_name, last_name, email, password, phone, address } = data;
    const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, address = ? WHERE id = ?`;
    const params = [first_name, last_name, email, password, phone, address, id];

    try {
        await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err.message);
                    return reject(err);
                }
                resolve(this.changes);
            });
        })
        return {
            id,
            first_name,
            last_name,
            email,
            phone,
            address
        }
    } catch (err) {
        console.error(err.message);
        return null;
    }
}
module.exports={
    put:putSettings
}