require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Connect to database
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database.");

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is live and listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

// For production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
