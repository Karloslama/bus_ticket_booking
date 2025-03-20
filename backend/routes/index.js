import express from "express";
import userRoutes from "./userRoutes.js";
import busRoutes from "./BusRoutes.js";
import bookingRoutes from "./BookingRoutes.js";
import adminRoutes from "./AdminRoutes.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

// Publicly accessible routes (Authentication)
router.use("/api/users", userRoutes);

// Protected routes - Require authentication
router.use("/api/buses", verifyToken, busRoutes);
router.use("/api/bookings", verifyToken, bookingRoutes);

// Admin routes - Require both authentication and admin privileges
router.use("/api/admin", verifyToken, adminRoutes);

export default router;
