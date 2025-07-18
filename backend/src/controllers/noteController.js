const Note = require("../models/note");

const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    // Check if note found
    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAllNotes = async (req, res) => {
  try {
    // Find all notes beloging to the user
    const notes = await Note.find({ username: req.user.username });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;

  // Check if the body has title and content
  if (!(title && content)) {
    return res
      .status(400)
      .json({ error: "Request must contain a title and content." });
  }

  if (title.length > 100) {
    return res.status(400).json({ error: "Title must be 100 words or less" });
  }

  try {
    // Create and save new post
    const newPost = new Note({ username: req.user.username, title, content });
    await newPost.save();

    res.json({ message: "Posts created successfully", newPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Check if the body has title and content
  if (!(title && content)) {
    return res
      .status(400)
      .json({ error: "Request must contain either a title or content." });
  }

  try {
    const note = await Note.findById(id); // Find note in database

    // Check if note found
    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    // Check if note belongs to the associated user
    if (note.username !== req.user.username) {
      return res
        .status(403)
        .json({ error: "You are not allowed to acces this note." });
    }

    // Update note
    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    res.json({ message: "Note successfully updated.", note });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id); // Find note in database

    // Check if note exists
    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    // Check if not belongs to the associated user
    if (note.username !== req.user.username) {
      return res
        .status(403)
        .json({ error: "You are not allowed to acces this note." });
    }

    // Delete note
    await Note.findByIdAndDelete(id);

    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { getNote, getAllNotes, createNote, updateNote, deleteNote };
