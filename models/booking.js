const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true  
  },
  pickupOption: {
    type: String,
    enum: ['center', 'delivery'],
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true,
  },
  car:{
    type: String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;