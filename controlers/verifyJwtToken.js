const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) =>{
    try{
        const token = req.headers['x-access-token'];
        if(!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.jwtSecretKey,(err,res)=>{
            if(err){
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            next();
        })
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = verifyToken;