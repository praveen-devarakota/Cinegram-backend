// models/Location.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // City name
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
