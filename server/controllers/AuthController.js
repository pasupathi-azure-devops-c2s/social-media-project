import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  req.body.password = hashedPass;

  const newUser = new UserModel(req.body);

  try {
    // Check if user already exists
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" }); // Return 400 if user exists
    }

    const user = await newUser.save();
    
    // Generate JWT token after successful registration
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY, // Make sure the JWT key is set in .env
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user, token }); // Return 200 if user is created
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: error.message }); // Return 500 if something goes wrong
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json("User not found"); // Return 404 if user is not found
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json("Wrong password"); // Return 400 if password is incorrect
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY, // Make sure the JWT key is set in .env
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user, token }); // Return 200 with user data and token
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: err.message }); // Return 500 if error occurs
  }
};
