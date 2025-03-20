import express from "express";
import {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
  getUserById,
  logout,
  refreshtoken,
} from "../controllers/UserController.js"; // Correct path with .js extension
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

// Public routes
router.post("/auth/register", signup);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/refresh", refreshtoken);

// Protected routes
router.get("/users", verifyToken, isAdmin, getAllUsers); // Only admin can see all users
router.put("/users/:id", verifyToken, updateUser); // Any authenticated user can update their profile
router.delete("/users/:id", verifyToken, isAdmin, deleteUser); // Only admin can delete users
router.get("/:id/bookings", verifyToken, getBookingsOfUser);
router.get("/users/:id", verifyToken, getUserById); // Users can get their own data

export default router;
