import Bookings from "../models/Booking.js";
import Bus from "../models/Bus.js";
import User from "../models/User.js";

// Create a new booking
export const createBooking = async (req, res, next) => {
  const { user, bus, seats, totalAmount, paymentId, paymentStatus } = req.body;

  // Input validation
  if (!user || !bus || !seats || !totalAmount || !paymentId) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if bus exists
    const foundBus = await Bus.findById(bus);
    if (!foundBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Create new booking
    const booking = new Bookings({
      user,
      bus,
      seats,
      totalAmount,
      paymentId,
      paymentStatus,
    });
    await booking.save();

    // Add booking to the user's bookings array (optional, if needed)
    foundUser.bookings.push(booking._id);
    await foundUser.save();

    // Add booked seats to the bus (optional, if needed)
    foundBus.bookedSeats.push(...seats);
    await foundBus.save();

    return res
      .status(201)
      .json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Bookings.find().populate("user bus"); // Populate user and bus data
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    return res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get booking by ID
export const getBookingById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const booking = await Bookings.findById(id)
      .populate("bus", "name from to")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update booking
export const updateBooking = async (req, res, next) => {
  const id = req.params.id;
  const { user, bus, seats, totalAmount, paymentId, paymentStatus } = req.body;

  // Input validation
  if (!user || !bus || !seats || !totalAmount || !paymentId) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    const booking = await Bookings.findByIdAndUpdate(
      id,
      { user, bus, seats, totalAmount, paymentId, paymentStatus },
      { new: true } // Return the updated document
    ).populate("user bus");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res
      .status(200)
      .json({ message: "Booking updated successfully", booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete booking
export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    const booking = await Bookings.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Optionally, remove the booking from the user's bookings array
    const user = await User.findById(booking.user);
    user.bookings = user.bookings.filter(
      (bookingId) => bookingId.toString() !== id
    );
    await user.save();

    // Optionally, remove the booked seats from the bus
    const bus = await Bus.findById(booking.bus);
    bus.bookedSeats = bus.bookedSeats.filter(
      (seat) => !booking.seats.includes(seat)
    );
    await bus.save();

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
