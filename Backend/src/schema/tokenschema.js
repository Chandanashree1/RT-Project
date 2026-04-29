const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema(
    {
        accessToken : String,
        accessTokenExpiresAt : Date,
        refreshToken : String,
        resfreshTokenExpiresAt : Date,
        client : {
            id : String
        },
        user : {
            id : String,
            email : String
        }
    },
    {
        timestamps : true
    }
)
module. exports = tokenSchema