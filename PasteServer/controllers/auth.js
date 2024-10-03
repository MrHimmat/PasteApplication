const User = require("../models/userModel"); // Assuming your model is in models/User.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT token
const JWT_SECRET = process.env.JWT_SECRET;

// User signup controller
exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  try {
    // Check if the user already exists
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter all filleds ...!",
      });
    }
    if (password != confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Password and Confirm Password Are Not Matching ...!",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ...!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully ...!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// User login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials ...!" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid Password , Enter Correct Password ...!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful ...!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong ...!", error: error.message });
  }
};
