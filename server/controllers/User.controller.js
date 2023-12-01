import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';

const bcryptSalt = bcryptjs.genSaltSync(10);
// const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the user's password using bcrypt
        const hashedPassword = bcryptjs.hashSync(password, bcryptSalt);

        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // Handle the case where the username already exists
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user in the database with the hashed password
        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
        });

        // Generate a JWT token with user information
        jwt.sign({ userId: createdUser._id, username }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to generate JWT token' });
            }

            // Set the JWT token as a cookie in the response
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
                username: createdUser.username,
            });
        });
    } catch (err) {
        // Handle errors, log them, and send an appropriate response
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username exists
        const user = await User.findOne({ username });

        if (!user) {
            // Handle the case where the username does not exist
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = bcryptjs.compareSync(password, user.password);

        if (!passwordMatch) {
            // Handle the case where the password is incorrect
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token with user information
        jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to generate JWT token' });
            }

            // Set the JWT token as a cookie in the response
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(200).json({
                id: user._id,
                username: user.username,
            });
        });
    } catch (err) {
        // Handle errors, log them, and send an appropriate response
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};