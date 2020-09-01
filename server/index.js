const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// All the middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

// API
const patients = require('./routes/api/patients')
const envelopes = require('./routes/api/envelopes')

app.use('/api/patients', patients)
app.use('/api/envelopes', envelopes)

app.listen(port, () => console.log(`Server started on port ${port}`));