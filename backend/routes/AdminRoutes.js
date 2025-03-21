import express from "express";
import {
  getAllUsers,
  adminSignup,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getAllBuses,
  addBus,
  updateBus,
  deleteBus,
} from "../controllers/AdminController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js"; // Ensure both token and admin check

const router = express.Router();

// Admin routes - Protected by token and admin verification
router.post("/admin-signup", adminSignup);
router.get("/users", verifyToken, isAdmin, getAllUsers); // Get all users
router.delete("/users/:id", verifyToken, isAdmin, deleteUser); // Delete a user
router.get("/bookings", verifyToken, isAdmin, getAllBookings); // Get all bookings
router.delete("/bookings/:id", verifyToken, isAdmin, deleteBooking); // Delete a booking
router.get("/buses", verifyToken, isAdmin, getAllBuses); // Get all buses
router.post("/buses", verifyToken, isAdmin, addBus); // Add a new bus
router.put("/buses/:id", verifyToken, isAdmin, updateBus); // Update a bus
router.delete("/buses/:id", verifyToken, isAdmin, deleteBus); // Delete a bus

export default router;
