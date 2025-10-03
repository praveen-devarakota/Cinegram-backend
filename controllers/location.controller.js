// controllers/locationController.js
import Location from "../models/location.model.js";

// Create a new location
export const createLocation = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Location name is required" });
    }

    // Check if location already exists
    const existing = await Location.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Location already exists" });
    }

    const location = new Location({ name });
    await location.save();
    res.status(201).json({ message: "Location created", location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all locations
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default { createLocation, getAllLocations };