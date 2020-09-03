'use strict';

const router = require('express').Router();

const Visit = require('../../models').visits;
const Patient = require('../../models').patients;

router.post('/', async function (req, res) {

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

router.post('/:id/:soap', async (req, res) => {
    // Code here
    try {
        let visit = await Visit.findOne( { _id: req.params.id });
        if (!visit) return res.status(400).json('Visit not found');

        visit[req.params.soap] = req.body.text;

        await visit.save();

        res.status(200).send('ok');
    } catch (err) {
        console.log(err)
        return res.status(500)
    }
});

router.post('/testingthejuicer', (req, res) => {
    console.log(req.body.text)
    res.status(200).send('it worked')
})

module.exports = router;