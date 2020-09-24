'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models').users;

const router = require('express').Router();

router.post('/', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if(!user) return res.status(400).json('Invalid username');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).json('Invalid password');

  const token = generateAuthToken(user);

  let responseObject = {
      token : token,
      first_name : user.first_name,
      last_name: user.last_name,
      isAdmin: user.isAdmin,
  }

  res.json(responseObject);
});

// TEMPORARY ONLY UNTIL NEW ACCOUNT VIEW IS DONE (IN THAT CASE, USE users/index.js)
router.post('/newAccount', async (req, res) => {
  try {
    console.log(req.body);
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash;
    console.log(req.body.password);
    let user = await User.create(req.body);
  } catch (err) {
      console.log(err);
      return res.status(500).json('Internal Server Error');
  }
});

function generateAuthToken (user) {
    let token = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'MySecretKey123', { expiresIn: "2 weeks" });
    return token;
}   


module.exports = router;