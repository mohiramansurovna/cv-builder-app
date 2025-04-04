require('dotenv').config();
const jwt=require('jsonwebtoken');


function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token){
        console.log('No token provided', req.headers);
        return res.status(401).send('Unauthorized');
    } 
        
    try{

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send('Forbidden');
            }
            req.user = decoded;
            next();
        });
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}
module.exports = authMiddleware;