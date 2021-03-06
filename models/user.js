const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: String
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// Prior to saving the User document, hash the password.
userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();
  
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);

    // Update clear-text password with the hash
    user.password = hash;
  
    next();
  });
});

userSchema.pre('findOneAndUpdate', async function(next) {
  const user = await this.getUpdate();

  if(user.password) {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
  } 
  next();
});

userSchema.methods.comparePassword = function(tryPassword, cb) {

  bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);