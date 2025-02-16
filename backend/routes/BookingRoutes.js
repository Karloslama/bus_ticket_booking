import express from "express";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} from "../controllers/BookingController.js";

const router = express.Router();

// Booking routes
router.post("/", createBooking); // Create a new booking
router.get("/", getAllBookings); // Get all bookings
router.get("/:id", getBookingById); // Get booking by ID
router.put("/:id", updateBooking); // Update booking
router.delete("/:id", deleteBooking); // Delete booking

export default router;