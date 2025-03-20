import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Bookings from "../models/Booking.js";
import dotenv from "dotenv";
dotenv.config();

//Get All users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//user Signup
export const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  //Input validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ messaage: "Passwords do not match" });
  }
  try {
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Hash Password
    const hashPassword = bycrypt.hashSync(password, 10);

    //create a new user
    const user = new User({ name, email, password: hashPassword, role });
    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update User
export const updateUser = async (req, res, next) => {
  const { name, email, password, role } = req.body; // Change 'isAdmin' to 'role'
  const id = req.params.id;

  // Input Validation
  if (!name || !email || !password || !role) {
    return res.status(422).json({ message: "All fields are required" });
  }

  // Validate role
  if (role !== "admin" && role !== "user") {
    return res
      .status(400)
      .json({ message: "Invalid role. Role must be 'admin' or 'user'" });
  }

  try {
    // Hash Password
    const hashPassword = bycrypt.hashSync(password, 10);

    // Update user with the new data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashPassword,
        role, // Update the role instead of isAdmin
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete the User
export const deleteUser = async (req, res, Next) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Errror" });
  }
};

//user login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(422).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordMatch = await bycrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate access token (short-lived)
    const accessToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Access token expires in 15 minutes
    );

    // Generate refresh token (long-lived)
    const refreshToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    // Save refresh token to the database
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    // Set refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enable in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with access token and user details
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Refresh token controller
export const refreshtoken = async (req, res) => {
  //Retrieve the refresh token from the cookie
  const token = req.cookie.refreshToken;
  if (!token) {
    return res.status(401).json({ messaage: "Unauthorized" });
  }
  try {
    //verify the refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    //check if the token matches the one stores in the database
    const existingUser = await User.findOne({
      _id: decoded.id,
      refreshToken: token,
    });
    if (!existingUser) {
      return res.status(403).json({ messaage: "Forbidden" });
    }
    //Generate a new access token
    const newAccessToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ messaage: "Forbidden" });
  }
};

//Logout
export const logout= async (req, res) => {
  const token= req.cookie.refreshToken;
  if(!token) return res.sendStatus(204) //No content if no token
  
  try {
    //find user by refresh token and clear it
    const existingUser= await User.findOne({refreshToken: token});
    if(existingUser){
      existingUser.refreshToken="";
      await existingUser.save()
    }
    //clear the cookie
    res.clearCookie("refreshToken",{
      httpOnly: true,
      secure: process.env.NODE_ENV==="prduction",
      sameSite: "strict",
    });
    return res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({messaage:"Internal Sever Erro"})
  }
}

//Get a booking of a user
export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bookings = await Bookings.find({ user: id })
      .populate("movie")
      .populate("user");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json({ bookings });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get user by Id
export const getUserById = async (req, res, next) => {
  const id = req.params.id;

  // Check if the provided id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // New access token expires in 15 minutes
    );

    // Respond with the new access token
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
