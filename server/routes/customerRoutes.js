const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

// Create a new employee
router.post('/', customerController.createCustomer);

// Get all employees
router.get('/', customerController.getCustomers);

module.exports = router;
