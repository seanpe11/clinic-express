'use strict';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];

const mongoose = require('mongoose');

console.log(`Using environment \'${env}\'`);

const connectDB = mongoose.connect(process.env.TEST_DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false

        })
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = connectDB;