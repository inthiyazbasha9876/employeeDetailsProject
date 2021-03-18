const express = require('express');
const dbconfig = require('./db');
const empLoginRouter = require('./routers/empLoginRouter')
const auth = require ('./routers/authRouter')
const config = require('./config')
const app = express()

/* router configeration */
app.use(express.json());
app.use('/employeeLoginDetails',empLoginRouter);
app.use('/auth',auth);

/* server running */
app.listen(config.port, () => {
    console.log('server started....');
})