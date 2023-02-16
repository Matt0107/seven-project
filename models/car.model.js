const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  energyType: String,
  doors: Number,
  seats: Number,
  gear: String,
  image: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

