const mongoose = require('mongoose')
const adminSchema = require('../schema/adminschema')
const admin = mongoose.model('Admin',adminSchema,"admin")
module.exports = admin