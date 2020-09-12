'use strict';

const Joi = require('joi');
const router = require('express').Router();

const Visit = require('../../models').visits;
const Patient = require('../../models').patients;

router.post('/', async function (req, res) {
    let { error } = validateRequestBody(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try {

        let patient = await Patient.findOne({ _id: req.body.patient });
        if(!patient) throw ({ error: true, status: 400, message: 'Patient not found' });
    
        let visit = await Visit.create(req.body);
        res.json(visit);

    } catch (err) {
        console.log(err);
        if(err.error) return res.status(err.status).json(err.message);
        else return res.status(500).json('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        let visit = await Visit.findOne({ _id: req.params.id });
        if(!visit) return res.status(400).json('Visit not found');

        res.json(visit);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

function validateRequestBody (body) {
    const schema = Joi.object().keys({
        patient: Joi.string().required(),
        weight: Joi.string().required(),
        heart_rate: Joi.string().required(),
        blood_pressure: Joi.string().required(),
        subject: Joi.string().required(),
        object: Joi.string().required(),
        assessment: Joi.string().required(),
        plan: Joi.string().required()
    });

    return schema.validate(body);
}

module.exports = router;