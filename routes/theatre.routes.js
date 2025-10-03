// routes/theatre.routes.js
import express from "express";
import { createTheatre, getAllTheatres, getTheatreById } from "../controllers/theatre.controller.js";

const router = express.Router();

// POST /api/theatres - create theatre
router.post("/", createTheatre);

// GET /api/theatres - get all theatres (optional query: ?locationId=xxx)
router.get("/", getAllTheatres);

// GET /api/theatres/:id - get single theatre by ID
router.get("/:id", getTheatreById);

export default router;
