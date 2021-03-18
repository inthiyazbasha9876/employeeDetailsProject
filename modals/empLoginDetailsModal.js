const mongoose = require('mongoose');

const empLoginDetails = new mongoose.Schema({
    userName : {
        type: String,
        requried: true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type: String,
        required : true,
    },
    empId : {
        type: Number,
        required : true,
    },
    createDate : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('empLoginDetails', empLoginDetails);