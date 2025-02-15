const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, 
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  customer:{
    type: String,
    required: true
  },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
