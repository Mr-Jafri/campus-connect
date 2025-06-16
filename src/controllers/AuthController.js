const express = require('express');
const router = express.Router();
const AuthService = require('../services/AuthService');

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await AuthService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await AuthService.login(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router; 