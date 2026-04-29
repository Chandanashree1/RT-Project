const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
    {
        clientId : {
            type : String,
            required : true,
            unique : true
        },
        clientSecret : {
            type : String,
            required : true,
        },
        grants : {
            type : [String],
            default : ['password','refresh_token']
        }
    }
) 
module.exports = clientSchema