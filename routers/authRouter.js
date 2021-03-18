const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
authRouter.get('/getToken', (req, res) => {
    try {
        const jwtToken = jwt.sign({ userName: 'admin' }, config.jwtSecretKey, {
            expiresIn: 86400
        })
        res.status(200).json({ token: jwtToken })
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = authRouter;