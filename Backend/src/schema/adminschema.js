const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
    {
        fullName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        phone : String,
        password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            enum : ['ceo','hr'],
            default : 'ceo'
        },
        isFirstLogin : {
            type : Boolean,
            default : true
        },
        lastLogin : Date,
        passwordChangeAt : Date,
        isActive : {
            type : Boolean,
            default : true
        },
    },
    {
        timestamps : true
    }
)
module.exports = adminSchema