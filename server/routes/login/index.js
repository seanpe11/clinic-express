'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models').users;

const router = require('express').Router();

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json('Invalid email/password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json('Invalid email/password');

    const token = generateAuthToken(user);

    let responseObject = {
        token : token,
        first_name : user.first_name,
        last_name: user.last_name,
        type: user.type,
    }

    res.json(responseObject);
});

function generateAuthToken (user) {
    let token = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'MySecretKey123', { expiresIn: "2 weeks" });
    return token;
}   


module.exports = router;