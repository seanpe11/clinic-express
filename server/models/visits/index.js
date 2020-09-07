'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'patients'
    },
    subject: {
        type: String
    },
    object: {
        type: String
    },
    assessment: {
        type: String
    },
    plan: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const model = mongoose.model('visits', schema);

module.exports = model;