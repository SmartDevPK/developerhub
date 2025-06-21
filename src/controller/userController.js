import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

//  Controller: Render Home Page
export const getHomePage = async (req, res) => {
  try {
    res.status(200).render("index", {
      title: "Home Page",
      message: null,
    });
  } catch (error) {
    console.error("Error rendering homepage:", error.message);
    res.status(500).render("error", {
      title: "Error",
      message: "Something went wrong while rendering the homepage.",
    });
  }
};

//  Controller: Register New User
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

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

    // Send verification email
    const verificationLink = `http://localhost:3300/verify/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    // Inform user to verify email
    res.status(200).render("index", {
      title: "Home Page",
      message: "User registered. Please verify your email.",
    });

  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).render("index", {
      title: "Home Page",
      message: "An error occurred. Please try again.",
    });
  }
};

//  Controller: Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).render("wellCome", {
        title: "Verification Failed",
        message: "Invalid or expired verification token.",
      });
    }

    // Mark as verified and clear token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    // Render success page
    res.status(200).render("wellCome", {
      title: `Welcome, ${user.username}`,
      message: "Your email has been successfully verified. You can now log in and start using your account.",
    });

  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).render("error", {
      title: "Error",
      message: "Something went wrong while verifying the email.",
    });
  }
};

//  Function: Send Verification Email
const sendVerificationEmail = async (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  // e.g., example@gmail.com
      pass: process.env.EMAIL_PASS,  // App password or actual password
    },
  });

  const mailOptions = {
    from: "PKDEVHUB",
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <p>Thank you for registering at PKDEVHUB.</p>
        <p>Please click the link below to verify your email:</p>
        <p><a href="${link}" style="color: #4CAF50;">${link}</a></p>
        <p>If you did not register, you can ignore this message.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
