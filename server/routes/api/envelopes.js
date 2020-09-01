// Router for patient envelopes
const express = require('express')
// const mongoose = require('mongoose')
const router = express.Router()

// Add Patient Envelope

// Retrieve Patient Envelopes

/**
 * Returns list of Patient envelopes
 */
router.get('/', (req, res) => {
    res.send("envelopes")
})

/**
 * Returns patient envelope from DB based from ID.
 * @param patientEnvelope (json)
 * @return patientEnvelope(json)
 */

// Update Patient Envelope

// Delete Patient Envelope

module.exports = router;