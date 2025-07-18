const express = require("express");
const noteController = require("../controllers/noteController");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
router.use(authenticateToken);

// Get singly note by id
router.get("/:id", authenticateToken, noteController.getNote);

// Get all notes for logged-in user
router.get("/", authenticateToken, noteController.getAllNotes);

// Create a new note
router.post("/", authenticateToken, noteController.createNote);

// Update note by id
router.put("/:id", authenticateToken, noteController.updateNote);

// Delete note by id
router.delete("/:id", authenticateToken, noteController.deleteNote);

module.exports = router;
