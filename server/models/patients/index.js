'use strict';

const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    province: String,
})

const schema = new mongoose.Schema({
    name: String,
    sex: String,
    address: [AddressSchema],
    contact_number: String,
    date_of_birth: Date,
    marital_status: String,
    height: String,
    previous_names: [String],
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