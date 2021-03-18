const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.dburl,{useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex: true})
const con = mongoose.connection

con.on('open',()=>{
    console.log('database connected...  ');
})