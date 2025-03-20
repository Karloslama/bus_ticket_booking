import Bus from "../models/Bus.js";

// Add a new bus
export const addBus = async (req, res, next) => {
  const { number, from, to, departureDate, departureTime, fare, capacity } =
    req.body;

  // Input validation
  if (
    !number ||
    !from ||
    !to ||
    !departureDate ||
    !departureTime ||
    !fare ||
    !capacity
  ) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    // Create new bus
    const bus = new Bus({
      number,
      from,
      to,
      departureDate,
      departureTime,
      fare,
      capacity,
    });

    await bus.save();

    return res.status(201).json({ message: "Bus added successfully", bus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all buses
export const getAllBuses = async (req, res, next) => {
  try {
    const buses = await Bus.find();
    if (!buses || buses.length === 0) {
      return res.status(404).json({ message: "No buses found" });
    }
    return res.status(200).json({ buses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get bus by ID
export const getBusById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    return res.status(200).json({ bus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update bus
export const updateBus = async (req, res, next) => {
  const id = req.params.id;
  const { number, from, to, departureDate, departureTime, fare, capacity } =
    req.body;

  // Input validation
  if (
    !number ||
    !from ||
    !to ||
    !departureDate ||
    !departureTime ||
    !fare ||
    !capacity
  ) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    const bus = await Bus.findByIdAndUpdate(
      id,
      {
        number,
        from,
        to,
        departureDate,
        departureTime,
        fare,
        capacity,
      },
      { new: true } // Return the updated document
    );

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    return res.status(200).json({ message: "Bus updated successfully", bus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete bus
export const deleteBus = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    return res.status(200).json({ message: "Bus deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
