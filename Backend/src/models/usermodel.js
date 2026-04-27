const mongoose = require('mongoose')
const userSchema = require('../schema/userschema')

const User = mongoose.model('User',userSchema)
module.exports = User