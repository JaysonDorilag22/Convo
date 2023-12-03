import express from 'express';
import { getProfile, login, logout, register, getAllUsers } from '../controllers/User.controller.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', logout);
router.get('/users', getAllUsers); // Add this line to fetch all users for the sidebar

export default router;
