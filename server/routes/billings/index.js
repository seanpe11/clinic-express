'use strict';

const router = require('express').Router();

const Billing = require("../../models").billings;

router.post('/', async(req, res) => {

    // Only allowed unique service name
    let service = await Billing.findOne({ service: req.body.service });
    if (service) { return res.status(400).json('Service already exists') }

    let newService = Billing.create({
        service: req.body.service,
        price: req.body.price,
        note: req.body.note
    });

    if (!newService) res.status(500).send("Something went wrong in creating service");

    res.status(200).status("Service added")
});

router.delete('/:id', async (req, res) => {
    try {
        async.parallel({
            patient: function (callback) {
                Billing.findByIdAndDelete(req.params.id)
                    .then((result) => { callback(null, result) })
                    .catch(err => callback(err));
            }

        }, async function (err, result) {
            if(err) {
                console.log(err);
                return res.status(500);
            }

            res.json(true);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
});

router.put('/:id', async function (req, res) {

    console.log(req.body);

    try {
        await Billing.updateOne({ _id: req.params.id }, req.body);        
        res.json(true);

    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});

router.get('/', async function(req, res){

    try {
        // TODO: Get the admin Obejct ID
        let adminID = '';

        let services = await Billing.find({ user: adminID });
        if(!services) return res.status(400).json('No services yet');

        res.json(services);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
    
})


module.exports = router;