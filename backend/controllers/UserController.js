const express = require('express');

const path = require('path');

const User = require('../models/UserSchema');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();



// Registering User user controller
const createUser = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;
  //file upload
  const profile = req.file ? req.file.path : null; 
  console.log("Profile photo" , profile);

  console.log({ fullName, email, phoneNumber, password, role, profile } , "Details of the user");


  try {
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password,
      role,
      profile, 
    });

    //hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error saving user - from controller" , error)
  }
};

//Logging in User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({message: "Please enter all fields"});
  }

  try {
    //find user by email
    const user = await User.findOne({ email});
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }

    // if user is present check their password 
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
        console.log("Invalid credentials-- inside controller");
    }
        // send notification to user

        //if everything is good generate jwt token
        //generate jwt token
        const token = jwt.sign({ id: user._id , email:user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generated" , token);

        //send response with token to frontend
        res.status(200).json({
            message: "Login successful",
            token : token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    
  } catch(error) {
    res.status(500).json({message: error.message});
    console.log("Error in loginUser - from controller" , error)
  }
};




// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
