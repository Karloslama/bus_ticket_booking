import express from "express";
import userRoutes from "./userRoutes.js";
import busRoutes from "./BusRoutes.js";
import bookingRoutes from "./BookingRoutes.js";

const router = express.Router();

// Use routes
router.use("/users", userRoutes); // User routes
router.use("/buses", busRoutes); // Bus routes
router.use("/bookings", bookingRoutes); // Booking routes

export default router;