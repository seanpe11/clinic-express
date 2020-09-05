'use strict';

const express = require('express');
const app = express.Router();

app.use('/api/patients', require('./patients'));
app.use('/api/visits', require('./visits'));

module.exports = app;