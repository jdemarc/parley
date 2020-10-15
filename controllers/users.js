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
  // Find user by e-mail using req.body created in userService fetch
  const user = await User.findOne({email: req.body.email});

  try {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        // res -- built into Express
        // represents HTTP response
        // .json lets you send back a json.
        // Build your own json >>
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
    console.log(user);

    if (!user) return res.status(401).json({err: 'bad credentials'});
    
    console.log(req.body.password);
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        console.log('Password not working.')
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

  await User.findOneAndUpdate( {_id: req.body.id}, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    console.log('findByOneAndUpdate', user);
  });

  return res.json();

  // await user.save()

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