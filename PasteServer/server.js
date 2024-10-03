const express = require("express");
const app = express();

// to get the data from the .env files
require("dotenv").config();

// Import database connection function
const { DBConnect } = require("./config/database");

// Import routes
const authRoutes = require("./routes/authRoutes");

// Get PORT from environment variables, fallback to 8000 if not found
const PORT = process.env.PORT || 8000;

// Middleware for parsing JSON bodies (no need for body-parser)
app.use(express.json()); // Parse JSON requests

const cors = require("cors");
app.use(cors());

// Mount routes
app.use("/api/v1", authRoutes);

// Connect to the database
DBConnect();

// Base route for GET request
app.get("/", (req, res) => {
  res.send("This is a GET request ...!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
