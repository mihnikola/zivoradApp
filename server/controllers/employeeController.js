const Employee = require("../models/Employee");

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, position, image } = req.body.params;
    const newEmployee = new Employee({ name, position, image });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
