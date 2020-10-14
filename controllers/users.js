const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index,
  update,
  find
};

async function index(req, res) {
  const users = await User.find({});
  res.status(200).json(users);
}

async function find(req, res) {
  console.log(req.body);
  const user = await User.findOne({email: req.body.email});

  try {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        res.json({
          err: 'User found!',
          status: 200
        });
      } else {
        return res.json({
          err: 'Bad credentials in find.',
          status: 401
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({
      err: error,
      status: 400,
    })
  }
}

async function signup(req, res) {
  const user = new User(req.body);

  try {
    await user.save();

    // String
    const token = createJWT(user);

    // Send back an object with property of 'token', value is the string.
    res.json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function login(req, res) {
  try {
    //Only looking for one -- find returns an Array.
    const user = await User.findOne({email: req.body.email});
    
    if (!user) return res.status(401).json({err: 'bad credentials'});
    
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (error) {
    const response = {
      error,
      status: 400
    }

    return res.json(response);
  }
}

async function update(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(401).json({err: 'bad credentials'});
    
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {

        //Update user here


        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
}
//------------------------------
// Functions that do not get exported... helpers

function createJWT(user) {
  //args: data payload, secret, (options/optional)
  return jwt.sign(
    { user }, // { user: user }
    SECRET,
    { expiresIn: '24h' } // Unspecified... forever
    // Sliding expiration? Refresh token upon login.
  );
}