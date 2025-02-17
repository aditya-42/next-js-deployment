const express = require('express');
const UserSchema = require('../models/UserSchema');
const app = express();

app.use(express.json());

// CRUD Operations

// 1. Create user in database
app.post('/create-users', async (req, res) => {
    const newUser = new UserSchema(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. get users from database
app.get('/users', async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. get single users
app.get('/users/:id', async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. update user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. delete  user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;