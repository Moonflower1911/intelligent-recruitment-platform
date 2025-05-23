const express = require('express');
const router = express.Router();
const { UserRecruiter, RecruiterForm , Interest } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddleware');
const {sign} = require("jsonwebtoken");


// Route for creating a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const existingUser = await UserRecruiter.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Create user with hashed password
        await UserRecruiter.create({username: username,password: hashedPassword});

        res.status(201).json({ message: 'User registered successfully' });
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

        const accessToken = sign({username: user.username, id: user.id},"secret");

        // Respond with success message
        res.json(accessToken);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json('Failed to log in');
    }
});

// Route for deleting a user account
router.delete('/delete', validateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        // Delete related data from RecruiterForms and Interests tables
    await Promise.all([
        RecruiterForm.destroy({ where: { UserRecruiterId: userId } }),
        Interest.destroy({ where: { OfferId: userId } }),
        // Add more tables as needed
      ]);
  
      // Finally, delete the user's account
      await UserRecruiter.destroy({ where: { id: userId } });

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});


module.exports = router;
