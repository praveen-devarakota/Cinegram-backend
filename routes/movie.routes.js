// routes/movie.routes.js
import express from "express";
import { createMovie, getAllMovies } from "../controllers/movie.controller.js";

const router = express.Router();

// POST /api/movies - create a new movie
router.post("/", createMovie);

// GET /api/movies - get all movies
router.get("/", getAllMovies);

export default router;
