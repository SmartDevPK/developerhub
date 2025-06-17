import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";

// Controller to render the home page
export const getHomePage = async (req, res) => {
  try {
    res.status(200).render("index", {
      title: "Home Page",
      message: null,  // Ensure message is defined (null or empty if none)
    });
  } catch (error) {
    console.error("Error rendering homepage:", error.message);
    res.status(500).render("error", {
      title: "Error",
      message: "Something went wrong while rendering the homepage.",
    });
  }
};

// Controller to register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).render("index", {
        title: "Home Page",
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Render the homepage with success message instead of redirecting
    res.status(200).render("index", {
      title: "Home Page",
      message: "Registration successful!",
    });

   
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).render("index", {
      title: "Home Page",
      message: "An error occurred. Please try again.",
    });
  }
};
