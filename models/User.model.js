const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const Car = require("./car.model");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: false,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  adress: {
    type: String,
    required: false,
  },
});

// Hash password before saving to database
// userSchema.pre('save', async function(next) {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(user.password, salt);
//   user.password = hash;
//   next();
// });

// Check if password is correct
// userSchema.methods.checkPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
