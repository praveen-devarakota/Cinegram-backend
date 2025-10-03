// controllers/theatre.controller.js
import Theatre from "../models/theatre.model.js";
import Location from "../models/location.model.js";
import Movie from "../models/movie.model.js";

// Create a new theatre
export const createTheatre = async (req, res) => {
  try {
    const { name, locationId, address, rating, services, screens } = req.body;

    if (!name || !locationId) {
      return res.status(400).json({ error: "Theatre name and location are required" });
    }

    // Validate location
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Validate movies in screens
    if (screens && screens.length > 0) {
      for (let screen of screens) {
        if (screen.movies && screen.movies.length > 0) {
          for (let movieId of screen.movies) {
            const movieExists = await Movie.exists({ _id: movieId });
            if (!movieExists) {
              return res.status(404).json({ error: `Movie not found: ${movieId}` });
            }
          }
        }
      }
    }

    // Save theatre (store IDs)
    const theatre = new Theatre({
      name,
      location: locationId,
      address,
      rating,
      services,
      screens,
    });

    await theatre.save();

    // Populate names for response
    const populatedTheatre = await Theatre.findById(theatre._id)
      .populate("location", "name")
      .populate("screens.movies", "name");

    res.status(201).json({ message: "Theatre created successfully", theatre: populatedTheatre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all theatres (optional filter by location)
export const getAllTheatres = async (req, res) => {
  try {
    const { locationId } = req.query;

    const query = locationId ? { location: locationId } : {};

    const theatres = await Theatre.find(query)
      .populate("location", "name")
      .populate("screens.movies", "name");

    res.status(200).json(theatres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single theatre by ID
export const getTheatreById = async (req, res) => {
  try {
    const { id } = req.params;

    const theatre = await Theatre.findById(id)
      .populate("location", "name")
      .populate("screens.movies", "name");

    if (!theatre) {
      return res.status(404).json({ error: "Theatre not found" });
    }

    res.status(200).json(theatre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
