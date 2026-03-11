import express from "express";
import {
  getAllRentals,
  getMyRentals,
  getRentalStats,
  createRental,
  cancelRental,
} from "../controllers/rental.controller.js";

const router = express.Router();

// GET /api/rentals/ 
router.get("/", getAllRentals);

// GET /api/rentals/my-rentals
router.get("/my-rentals", getMyRentals);

// GET /api/rentals/stats
router.get("/stats", getRentalStats);

// POST /api/rentals/
router.post("/", createRental);

// DELETE /api/rentals/:id 
router.delete("/:id", cancelRental);

export default router;
