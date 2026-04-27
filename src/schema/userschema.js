const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        adminId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Admin',
            required : true
        },
        isDelete : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true
    }
)
module.exports = userSchema