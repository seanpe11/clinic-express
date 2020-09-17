'use strict';

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    filename: String,
    visitID: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const model = mongoose.model('Files', schema);

module.exports = model;