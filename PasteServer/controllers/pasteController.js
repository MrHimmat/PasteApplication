const Paste = require("../models/pasteModel");

// Function to create a new paste
exports.createPaste = async (req, res) => {
  const { title, content, pasteId } = req.body; // Extracting data from request body

  try {
    const paste = new Paste({
      title: title,
      content: content,
      _id: pasteId || undefined, // Only pass pasteId if available
    });

    const existingPaste = await Paste.findOne({ title, content });

    if (existingPaste) {
      return res.status(409).json({
        success: false,
        error: "Exist",
        message: "A paste with the same title and content already exists.",
      });
    }

    await paste.save(); // Saving the new paste to the database

    res.status(200).json({
      success: true,
      message: "Paste Created Successfully ...!",
      paste, // Returning the created paste as part of the response
    });

    console.log("Paste created successfully", paste);
  } catch (error) {
    console.error("Error creating paste:", error);

    // Send a proper error response
    res.status(500).json({
      success: false,
      message: "Paste creation failed",
      error: error.message, // Sending error message
    });
  }
};

// Function to remove a paste
exports.removePaste = async (req, res) => {
  const pasteId = req.params; // Get pasteId from request body

  try {
    const paste = await Paste.findByIdAndDelete(pasteId);
    console.log("🚀 ~ exports.removePaste= ~ paste:", paste);

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: "Paste not found ...!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Paste deleted successfully ...!",
    });
  } catch (error) {
    console.error("Error deleting paste:", error);
    res.status(500).json({
      success: false,
      message: "Paste deletion failed ...!",
      error: error.message, // Send error message
    });
  }
};

// Function to fetch all pastes
exports.getAllPastes = async (req, res) => {
  try {
    const pastes = await Paste.find(); // Retrieve all pastes from the database

    res.status(200).json({
      success: true,
      pastes, // Return the list of pastes
      message: "Pastes Fetched Succcessfully ...!",
    });
  } catch (error) {
    console.error("Error fetching pastes:", error);

    // Send a proper error response
    res.status(500).json({
      success: false,
      message: "Fetching pastes failed ...!",
      error: error.message, // Sending error message
    });
  }
};

// Function to update an existing paste
exports.updatePaste = async (req, res) => {
  const { title, content } = req.body; // Get data from request body
  const pasteId = req.params;

  try {
    const paste = await Paste.findById(pasteId);
    console.log("🚀 ~ exports.updatePaste= ~ paste:", paste);

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: "Paste not found ...!",
      });
    }

    // Update fields
    paste.title = title || paste.title; // Update title if provided
    paste.content = content || paste.content; // Update content if provided
    paste.pasteId = pasteId || paste.pasteId;
    await paste.save(); // Save the updated paste to the database

    res.status(200).json({
      success: true,
      message: "Paste updated successfully ...!",
      paste, // Return the updated paste
    });
  } catch (error) {
    console.error("Error updating paste:", error);
    res.status(500).json({
      success: false,
      message: "Paste update failed ...!",
      error: error.message, // Send error message
    });
  }
};
