import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getAllBuses,
  addBus,
  updateBus,
  deleteBus,
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/authMiddleware.js"; // Middleware to check if user is admin

const router = express.Router();

// Admin routes
router.get("/users", isAdmin, getAllUsers); // Get all users
router.delete("/users/:id", isAdmin, deleteUser); // Delete a user
router.get("/bookings", isAdmin, getAllBookings); // Get all bookings
router.delete("/bookings/:id", isAdmin, deleteBooking); // Delete a booking
router.get("/buses", isAdmin, getAllBuses); // Get all buses
router.post("/buses", isAdmin, addBus); // Add a new bus
router.put("/buses/:id", isAdmin, updateBus); // Update a bus
router.delete("/buses/:id", isAdmin, deleteBus); // Delete a bus

export default router;