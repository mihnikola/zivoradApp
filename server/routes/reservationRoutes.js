const express = require('express');
const reservationController = require('../controllers/reservationController');
const { authenticate } = require('../helpers');

const router = express.Router();

// Create a new reservation
router.post('/', authenticate,reservationController.createReservation);

// Get all reservations
router.get('/', authenticate,reservationController.getReservations);

module.exports = router;
