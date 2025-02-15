const Customer = require('../models/Customer');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name } = req.body;
    const newCustomer = new Customer({ name });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
