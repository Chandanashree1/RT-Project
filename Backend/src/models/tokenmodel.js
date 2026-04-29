const mongoose = require('mongoose')
const tokenSchema = require('../schema/tokenschema')

const Token = mongoose.model('Token', tokenSchema)
module.exports = Token