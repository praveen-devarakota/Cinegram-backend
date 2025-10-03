// controllers/movie.controller.js
import Movie from "../models/movie.model.js";

// Create a new movie
export const createMovie = async (req, res) => {
  try {
    const { name, duration, language, rating, genre } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Movie name is required" });
    }

    // Check if movie already exists
    const existing = await Movie.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Movie already exists" });
    }

    const movie = new Movie({ name, duration, language, rating, genre });
    await movie.save();

    res.status(201).json({ message: "Movie created", movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
