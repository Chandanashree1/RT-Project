const mongoose = require('mongoose');
const clientSchema = require('../schema/clientschema');

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;