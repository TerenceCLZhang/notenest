const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Helper functions for JWT tokens
const generateAccessToken = (user) => {
  return jwt.sign({ username: user.username }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ username: user.username }, process.env.JWT_REFRESH_SECRET);
};

const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password in body
  if (!(username && password)) {
    return res
      .status(400)
      .json({ error: "Request must contain a username and password." });
  }

  // Check if username has a length of at least 3
  if (username.length < 3) {
    return res.status(400).json({ error: "Username too short." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken." });
    }

    // Hash password + salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Create JWT after user is created
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({
      message: "User created and logged in",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password in body
  if (!(username && password)) {
    return res
      .status(400)
      .json({ error: "Request must contain a username and password." });
  }

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Check if password is same as stored password
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }

  // Authenticate with JWT
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
};

module.exports = { register, login };
