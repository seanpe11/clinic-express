'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models').users;

const router = require('express').Router();

router.post('/', async (req, res) => {
    // let { error } = validateRequestBody(req.body);
    // if(error) return res.status(400).json(error.details[0].message);

    let user = await User.findOne({ username: req.body.username });
    if(user) return res.status(400).json('Username already registered');

    let hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));

    let new_user = await User.create({
        username: req.body.username,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        isAdmin: req.body.isAdmin,
    });

    if(!new_user) return res.status(500).json('Something went wrong while creating a new user');

    const token = generateAuthToken(new_user);

    let responseObject = {
        token : token,
        first_name : new_user.first_name,
        last_name: new_user.last_name,
        isAdmin: new_user.isAdmin,
    }

    res.status(200).send('User added');
})

router.get('/', (req, res) => {
    User.find({}, 'createdAt updatedAt username first_name last_name isAdmin password', function(err, users) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(users);
        }
    })
})

router.put('/', async (req, res) => {
    await User.findByIdAndUpdate(req.body._id, 
        {   
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            isAdmin: req.body.isAdmin,
            username: req.body.username,
        }, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                if (user) {
                    res.status(200).send('User updated');
                } else {
                    res.status(404).send('User not found');
                }
            }
        })
})

router.put('/password', async (req, res) => {
    let hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
    await User.findByIdAndUpdate(req.body._id, { password: hash }, function (err, user){
        if (err) {
            res.status(500).send(err);
        } else {
            if (user) {
                res.status(200).send('Password changed');
            } else {
                res.status(404).send('User not found');
            }
        }
    })
})

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id, function(err, byebye) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send('user deleted');
        }
    })
})


function validateRequestBody (body) {
    const schema = Joi.object().keys({
        first_name: Joi.string().min(2).max(20).required(),
        last_name: Joi.string().min(2).max(20).required(),
        password: Joi.string().min(6).max(20).required(),
        username: Joi.string().required(),
        isAdmin: Joi.boolean().required()
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