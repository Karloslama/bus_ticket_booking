import express from "express";
import {
    getAllUsers,
    signup,
    updateUser,
    deleteUser,
    login,
    getBookingsOfUser,
    getUserById,
} from "../controllers/UserController.js"; // Correct path with .js extension

const router = express.Router();

// User routes
router.get("/", getAllUsers);
router.post("/signup", signup);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);
router.get("/:id/bookings", getBookingsOfUser);
router.get("/:id", getUserById);

export default router;