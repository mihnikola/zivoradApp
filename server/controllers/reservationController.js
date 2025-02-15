const Reservation = require("../models/Reservation");

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const { date, time, service_id, employee_id, customer, customer_id } = req.body.params;
    const newReservation = new Reservation({ date, time, service_id, employee_id, customer, customer_id });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  const {date} = req.query;
  try {
    const reservations = await Reservation.find({date})
      .populate('service_id')  // Populate service data
      .populate('employee_id'); // Populate employee data
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
