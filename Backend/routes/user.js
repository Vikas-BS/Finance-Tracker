import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();


router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('name email profilePic phone ');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/profile', verifyToken, async (req, res) => {
  const { name, profilePic, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, profilePic, phone },
      { new: true }
    ).select('name email profilePic phone');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
