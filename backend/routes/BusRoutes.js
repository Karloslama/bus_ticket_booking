import express from "express";
import {
    addBus,
    getAllBuses,
    getBusById,
    updateBus,
    deleteBus,
} from "../controllers/BusContoller.js";

const router = express.Router();

// Bus routes
router.post("/", addBus); // Add a new bus
router.get("/", getAllBuses); // Get all buses
router.get("/:id", getBusById); // Get bus by ID
router.put("/:id", updateBus); // Update bus
router.delete("/:id", deleteBus); // Delete bus

export default router;