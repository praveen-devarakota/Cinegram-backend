// models/Theatre.js
import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, // Reference to Location
  address: String,
  rating: Number,
  services: [String], // e.g., ["Parking", "Food Court", "3D Screens"]
  screens: [
    {
      screenNumber: Number,
      movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Movies playing in this screen
    },
  ],
});

const Theatre = mongoose.model("Theatre", theatreSchema);
export default Theatre;
