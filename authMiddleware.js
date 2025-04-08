require('dotenv').config();
const jwt=require('jsonwebtoken');
const db=require('./models/db.js');
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token){
        console.log("Middleware redirecting to home")
        return res.status(403).redirect('/auth/home');
    } 
    try{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Middleware redirecting to home")
                return res.status(403).redirect('/auth/home');
            }
            db.get("SELECT * FROM users WHERE id = ?", [decoded.id], (err, user) => {
                if(err) return res.status(500).send('Internal Server Error');

                if(!user){
                    console.log("Middleware redirecting to home")
                    return res.status(403).redirect('/auth/home');
                }
                req.user=user;
                next();
            })
        });
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = authMiddleware;