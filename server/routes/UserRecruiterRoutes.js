const express = require('express');
const router = express.Router();
const { UserRecruiter } = require('../models');
const bcrypt = require('bcrypt');

// Route for creating a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        await UserRecruiter.create({
            username: username,
            password: hashedPassword  ,
        });

        // Respond with success message
        res.json('SUCCESS');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json('Failed to create user');
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await UserRecruiter.findOne({ where: { username: username } });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong username and password combination" });
        }

        // Respond with success message
        res.json('You logged in');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json('Failed to log in');
    }
});

module.exports = router;
