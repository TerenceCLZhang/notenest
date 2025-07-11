require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Note = require("./models/note");
const User = require("./models/user");

const app = express();
const PORT = 8080;

// Connect to database
const DB_URI = `mongodb+srv://terencezhang:${process.env.MONGO_ATLAS_PASSWORD}@personal-notes-app.zayv1ve.mongodb.net/app?retryWrites=true&w=majority&appName=personal-notes-app`;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to database.");

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is live and listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));

// Allow JSON data
app.use(express.json());
// HTTP logging
app.use(morgan("dev"));

app.get("/users", (req, res) => {
  res.status(200).send();
});

app.post("/user/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password in body
  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Request must contain a username and password." });
  }

  // Check if username has a length of at least 3
  if (username.length < 3) {
    res.status(400).json({ error: "Username too short." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "Username already taken." });
    }

    // Hash password + salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password in body
  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Request must contain a username and password." });
  }

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ error: "User not found." });
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
  console.log(user);
  const accessToken = jwt.sign(
    { username: user.username, password: user.password },
    process.env.JWT_ACCESS_SECRET
  );

  res.json({ accessToken });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorised access." });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
    if (error) {
      res.status(403).json({ error: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

app.post("/post", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  if (!(title && content)) {
    res
      .status(400)
      .json({ error: "Request must contain a title and content." });
  }

  try {
    const newPost = { username: req.user.username, title, content };
    await newPost.save();

    res.json({ message: "Posts created successfully", newPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
