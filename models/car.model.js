const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    doors: Number,
    type: String,
    seats: Number,
    transmission: String,
    availabilty: Date
  });

  const Car = mongoose.model('Car', carSchema);

  module.exports = Car;