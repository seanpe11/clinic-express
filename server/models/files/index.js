// TO DO @DENNIS: Supporting Files
'use strict'

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    filename: String,
    visitID: String,
    filedata: Object,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const model = mongoose.model('files', schema);

module.exports = model;