import Bookings from "../models/Booking.js";
import Bus from "../models/Bus.js";
import User from "../models/User.js";

// Create a new booking
export const createBooking = async (req, res, next) => {
  const { userId, busId, seats, totalAmount, paymentId, status } = req.body;

  // Input validation
  if (!userId || !busId || !seats || !totalAmount || !paymentId) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if bus exists
    const foundBus = await Bus.findById(busId);
    if (!foundBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Create new booking
    const booking = new Bookings({
      userId,
      busId,
      seats,
      totalAmount,
      paymentId,
      status, // 'pending', 'confirmed', 'cancelled'
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
    const bookings = await Bookings.find().populate("userId busId"); // Populate user and bus data
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
      .populate("busId", "name from to") // Populate bus details
      .populate("userId", "name email"); // Populate user details

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
  const { userId, busId, seats, totalAmount, paymentId, status } = req.body;

  // Input validation
  if (!userId || !busId || !seats || !totalAmount || !paymentId) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    const booking = await Bookings.findByIdAndUpdate(
      id,
      { userId, busId, seats, totalAmount, paymentId, status },
      { new: true } // Return the updated document
    ).populate("userId busId");

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
    const user = await User.findById(booking.userId);
    user.bookings = user.bookings.filter(
      (bookingId) => bookingId.toString() !== id
    );
    await user.save();

    // Optionally, remove the booked seats from the bus
    const bus = await Bus.findById(booking.busId);
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
