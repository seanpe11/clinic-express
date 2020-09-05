'use strict';

const router = require('express').Router();
const async = require('async');
const moment = require('moment');

const Patient = require('../../models').patients;
const Visits = require('../../models').visits;

const { createValidateBody, updateValidateBody } = require('./methods/validation');

router.post('/', async function (req, res) {

    const { error } = createValidateBody(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try {
        let patient = await Patient.create(req.body);
        res.json(patient);

    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});

router.put('/:id', async function (req, res) {

    const { error } = updateValidateBody(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    try {
        await Patient.updateOne({ _id: req.params.id }, req.body);        
        res.json(true);

    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});

router.get('/', async function (req, res) {
    try {

        let config = {}
        if(req.query.s) config = { name: { $regex: `.*${req.query.s}.*`, $options: 'i' } }

        async.parallel({
            patients: function (callback) {
                Patient.find(config).sort('name').select('_id name')
                    .then((result) => { callback(null, result) })
                    .catch(err => callback(err))
            },
            visits: function (callback) {
                Visits.aggregate([
                    { $group: {
                        _id: { patient: "$patient"},
                        lastVisit: { $last: "$createdAt"}
                    }}
                ])
                .then((result) => { callback(null, result) })
                .catch(err => callback(err));
            }
        }, function (err, result) {
            if(err) {
                console.log(err);
                return res.status(500);
            }

            let patients = result.patients;
            let visits = result.visits;

            let returnObj = [];
            patients.forEach(patient => {
                let lastVisit = 'No Visit Yet';
                let setObj = patient;
                visits.forEach(visit => {
                    if(visit._id.patient.equals(patient._id)) lastVisit = moment(visit.lastVisit).format('LLL');
                });
                setObj = Object.assign(setObj, { lastVisit })
                returnObj.push({ _id: patient._id, name: patient.name, lastVisit })
            });

            res.json(returnObj);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});

router.get('/:id', async function (req, res) {
    try {
        async.parallel({
            patient: function (callback) {
                Patient.findOne({ _id: req.params.id })
                    .then((result) => { callback(null, result) })
                    .catch(err => callback(err));
            },
            visits: function (callback) {
                Visits.find({ patient: req.params.id }).select('_id createdAt patient')
                    .then((result) => { callback(null, result)})
                    .catch(err => callback(err));
            }
        }, async function (err, result) {
            if(err) {
                console.log(err);
                return res.status(500);
            }

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});

module.exports = router;