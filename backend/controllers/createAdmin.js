// import bycrypt from "bcryptjs";
// import User from "../models/User.js";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// dotenv.config();

// const createAdmin= async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI,{
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     const adminExists = await User.findOne({email: "admin@example.com"});
//     if(adminExists){
//       console.log("Admin already exists");
//       return;
//     }

//     const hashedPassword = await bycrypt.hash("admin@123",10);

//     const admin = new User({
//       name: "Admin",
//       email: "admin@example.com",
//       password: hashedPassword,
//       role: "admin"
//     })

//     await admin.save();
//     console.log("admin user created Successfully!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.log("Error creating the admin: ", error);
//     mongoose.connection.close();
    
//   }
// }

// createAdmin();