'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models').users;

const router = require('express').Router();

router.post('/', async (req, res) => {
    let { error } = validateRequestBody(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).json('Email already registered');

    let hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));

    let new_user = await User.create({
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        type: req.body.type
    });

    if(!new_user) return res.status(500).json('Something went wrong while creating a new user');

    const token = generateAuthToken(new_user);

    let responseObject = {
        token : token,
        first_name : new_user.first_name,
        last_name: new_user.last_name,
        type: new_user.type,
    }

    res.json(responseObject);
})


function validateRequestBody (body) {
    const schema = Joi.object().keys({
        first_name: Joi.string().min(2).max(20).required(),
        last_name: Joi.string().min(2).max(20).required(),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        type: Joi.string().required()
    });

    return schema.validate(body);
}

function generateAuthToken (user) {
    let token = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'MySecretKey123', { expiresIn: "2 weeks" }); // you can change the secret key and put them in an environment variable
    return token;
}   

module.exports = router;