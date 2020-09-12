'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const model = mongoose.model('users', schema);

module.exports = model;