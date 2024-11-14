import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// Get a User by ID
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails); // Send user data excluding password
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error); // 500 if something goes wrong
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users); // Send list of all users
  } catch (error) {
    res.status(500).json(error); // 500 if error occurs
  }
};

// Update user data
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // If password is provided, hash it before saving
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      // Update user in database
      const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

      // Generate new JWT token after updating user data
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY, // JWT key from .env
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token }); // Send updated user and new token
    } catch (error) {
      res.status(500).json(error); // 500 if error occurs
    }
  } else {
    res.status(403).json("Access Denied! You can update only your own account.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id); // Delete user from DB
      res.status(200).json("User Deleted Successfully!"); // Send success message
    } catch (error) {
      res.status(500).json(error); // 500 if error occurs
    }
  } else {
    res.status(403).json("Access Denied!"); // 403 if trying to delete someone else's account
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    return res.status(403).json("Action Forbidden"); // Cannot follow yourself
  }

  try {
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(_id);

    if (!followUser.followers.includes(_id)) {
      await followUser.updateOne({ $push: { followers: _id } });
      await followingUser.updateOne({ $push: { following: id } });
      res.status(200).json("User followed!"); // Successfully followed
    } else {
      res.status(403).json("You are already following this user"); // Already following
    }
  } catch (error) {
    res.status(500).json(error); // 500 if error occurs
  }
};

// Unfollow a User
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    return res.status(403).json("Action Forbidden"); // Cannot unfollow yourself
  }

  try {
    const unFollowUser = await UserModel.findById(id);
    const unFollowingUser = await UserModel.findById(_id);

    if (unFollowUser.followers.includes(_id)) {
      await unFollowUser.updateOne({ $pull: { followers: _id } });
      await unFollowingUser.updateOne({ $pull: { following: id } });
      res.status(200).json("Unfollowed Successfully!"); // Successfully unfollowed
    } else {
      res.status(403).json("You are not following this user"); // Not following this user
    }
  } catch (error) {
    res.status(500).json(error); // 500 if error occurs
  }
};
