const express = require('express');
const bcryptjs = require('bcryptjs')
const empLoginModal = require ('../modals/empLoginDetailsModal')
const loginRouter = express.Router();

loginRouter.post('/register',(req,res)=>{
    const encriptPassword = bcryptjs.hashSync(req.body.password,8)
    const reqObj = new empLoginModal({
        userName : req.body.userName,
        password :encriptPassword,
        role: req.body.role,
        empId:req.body.empId,
    })
    try{
        const resObj = reqObj.save()
        res.status(200).json(resObj);
    }catch(err){
        res.status(500).send('error creating user')
    }
})

loginRouter.get('/getall',(req,res)=>{
    try{
        res.send('hello')
    }catch(err){
        res.send(err)
    }
})
module.exports = loginRouter;