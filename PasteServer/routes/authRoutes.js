const express = require("express");
const router = express.Router();

// import the controllers to set the routes
const { signup, login } = require("../controllers/auth");
const {
  createPaste,
  updatePaste,
  removePaste,
  getAllPastes,
} = require("../controllers/pasteController");

// authentication routes
router.post("/signup", signup);
router.post("/login", login);

// paste creating routes
router.post("/createPaste", createPaste);
router.put("/updatePaste/:_id", updatePaste); // Fixed path
router.delete("/removePaste/:_id", removePaste); // Uses _id as a URL parameter
router.get("/getAllPastes", getAllPastes);

module.exports = router;
