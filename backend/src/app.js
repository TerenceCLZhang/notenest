const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

module.exports = app;
