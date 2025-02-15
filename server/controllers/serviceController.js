const Service = require('../models/Service');

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, price, duration, image } = req.body.params;
    const newService = new Service({ name, price, duration, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

