'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    address: String,
    occupation: String,
    contact_number: String,
    date_of_birth: Date,
    marital_status: String,
    height: String,
    previous_names: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

const model = mongoose.model('patients', schema);

module.exports = model;