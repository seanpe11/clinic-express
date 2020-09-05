
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('../routes');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);

module.exports = app;