const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Create a new employee
router.post('/', employeeController.createEmployee);

// Get all employees
router.get('/', employeeController.getEmployees);

module.exports = router;
