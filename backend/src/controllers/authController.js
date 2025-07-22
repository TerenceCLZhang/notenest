const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper functions for JWT tokens
const generateAccessToken = (user) => {
  return jwt.sign({ username: user.username }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ username: user.username }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username and password in body
  if (!(username && email && password)) {
    return res
      .status(400)
      .json({ error: "Request must contain a username, email, and password." });
  }

  // Check if username has a length of at least 3
  if (username.length < 3) {
    return res.status(400).json({ error: "Username too short." });
  }

  try {
    // Check if username is taken
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      return res.status(400).json({ error: "Username already taken." });
    }

    // Check if email is taken
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash password + salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create JWT after user is created
    const accessToken = generateAccessToken(newUser);
    const refreshToken = await generateRefreshToken(newUser);

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: COOKIE_MAX_AGE,
      })
      .json({
        message: "User created and logged in",
        accessToken,
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
  const refreshToken = await generateRefreshToken(user);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: COOKIE_MAX_AGE,
    })
    .json({ message: "Successfully logged in", accessToken });
};

const token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Check if valid refresh token
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not found." });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden." });
    }

    // Create new access token
    const accessToken = generateAccessToken(user);
    res.json({
      message: "Successfully generated new access token",
      user,
      accessToken,
    });
  });
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { register, login, token, logout };
