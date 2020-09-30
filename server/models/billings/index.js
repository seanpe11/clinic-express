'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users'
    },
    service: String,
    price: Number,
    note: String
})

const model = mongoose.model('billing', schema);

module.exports = model;