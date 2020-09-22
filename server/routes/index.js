'use strict';

const express = require('express');
const app = express.Router();

app.use('/api/login', require('./login'));
app.use('/api/users', require('./users'));
app.use('/api/patients', require('./patients'));
app.use('/api/visits', require('./visits'));
app.use('/api/files', require('./files'));

module.exports = app;