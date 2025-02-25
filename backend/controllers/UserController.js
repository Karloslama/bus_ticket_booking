import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Bookings from "../models/Booking.js";

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

  if(password!== confirmPassword){
    return res.status(400).json({messaage:"Passwords do not match"})
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
    const user = new User({ name, email, password: hashPassword });
    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update User
export const updateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const id = req.params.id;

  //Input Validation
  if (!name || !email || !password) {
    return res.status(422).json({ message: "All fields are required" });
  }
  try {
    //Hash Password
    const hashPassword = bycrypt.hashSync(password, 10);

    //update user
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashPassword,
      },
      { new: true } //Return the updated documeent
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully", user });
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

  //Input validation
  if (!email || !password) {
    return res.status(422).json({ message: "User Not found" });
  }
  try {
    //find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
    }

    //compare password
    const isPasswordMatch = await bycrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invaid Password" });
    }

    //Generate JWT token
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
    return res
      .status(200)
      .json({ message: "Login Successfull", token, id: existingUser._id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get a booking of a user
export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bookings = await Bookings.find({ user: id })
      .populate("movie")
      .populate("user");
      
      if(!bookings || bookings.length === 0){
        return res.status(404).json({message: "No bookings found"})
      }

      return res.status(200).json({ bookings });
    } catch (err) {
    console.log(err);
    return res.status(500).json({message:"Internal server error"})
  }
};

//Get user by Id
export const getUserById= async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({message:'User not found'})
    }

    return res.status(200).json({user})
  } catch (err) {
    console.log(err)
    return res.status(500).json({message:"Internal Server Error"});
  }
  
}