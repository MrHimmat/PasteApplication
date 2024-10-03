const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Make title required
    trim: true, // Trim whitespace
  },
  content: {
    type: String,
    required: true, // Make content required
  },
  _id: {
    type: String,
    default: () =>
      Date.now().toString(36) + Math.random().toString(36).substring(2),
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create the Paste model using the schema
const Paste = mongoose.model("Paste", pasteSchema);

module.exports = Paste;
