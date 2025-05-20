const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // JWT verification middleware

// GET /api/profile/me - Get current logged-in user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user is set in authMiddleware after verifying JWT token
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

