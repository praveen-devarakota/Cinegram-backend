// models/Movie.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  duration: String,       // e.g., "2h 30m"
  language: String,       // e.g., "English"
  rating: String,         // e.g., "PG-13"
  genre: [String],        // e.g., ["Action", "Adventure"]
});
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
