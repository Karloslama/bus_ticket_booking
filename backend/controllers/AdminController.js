import User from "../models/User.js";
import Bookings from "../models/Booking.js";
import Bus from "../models/Bus.js";
import bycrypt from "bcryptjs";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminSignup = async (req, res) => {
  if (process.env.ALLOW_ADMIN_SIGNUP !== "true") {
    return res.status(403).json({ message: "Admin signup is disabled" });
  }

  const { name, email, password } = req.body;

  try {
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin user already exists" });
    }

    // Hash the password
    const hashedPassword = await bycrypt.hash(password, 10);

    // Create the admin user
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    // Disable admin signup after the first admin is created
    process.env.ALLOW_ADMIN_SIGNUP = "false";

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (err) {
    console.error(err);
    console.log(err)
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find()
      .populate("user", "name email")
      .populate("bus", "name from to");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Bookings.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new bus
export const addBus = async (req, res) => {
  const { name, from, to, seats } = req.body;
  try {
    const bus = new Bus({ name, from, to, seats });
    await bus.save();
    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a bus
export const updateBus = async (req, res) => {
  const { name, from, to, seats } = req.body;
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { name, from, to, seats },
      { new: true }
    );
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus updated successfully", bus });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a bus
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
