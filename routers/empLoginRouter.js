const express = require('express');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const empLoginModal = require('../modals/empLoginDetailsModal')
const loginRouter = express.Router();
const verifyToken = require('../controlers/verifyJwtToken')

loginRouter.post('/register', verifyToken, async (req, res) => {
    const encriptPassword = bcryptjs.hashSync(req.body.password, 8)
    const reqObj = new empLoginModal({
        userName: req.body.userName,
        password: encriptPassword,
        role: req.body.role,
        empId: req.body.empId,
        email: req.body.email
    })
    try {
        const resObj = await reqObj.save()
        res.status(200).json(resObj);
    } catch (err) {
        res.status(500).send('error creating user')
    }
})

loginRouter.post('/login', async (req, res) => {
    try {
        await empLoginModal.findOne({ userName: req.body.userName }, (err, user) => {
            if (err)
                return res.status(500).send('Error on the server.')
            if (!user)
                return res.status(401).send('user not found')

            const validatePassword = bcryptjs.compareSync(req.body.password, user.password)

            if (!validatePassword)
                return res.status(401).send('wrong password')
            const token = jwt.sign({ userName: user.userName }, config.jwtSecretKey, {
                expiresIn: 86400
            })
            const resObj = {
                empId: user.empId,
                userName: user.userName,
                token: token
            }
            res.status(200).json(resObj)
        })
    } catch (err) {
        res.status(500).send(err)
    }
})
module.exports = loginRouter;