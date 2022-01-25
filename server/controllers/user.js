import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const jwtSecret = process.env.JWT_SEC;

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not found");
      error.code = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.code = 400;
      throw error;
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message || "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.code = 400;
      throw error;
    }
    if (password !== confirmPassword) {
      const error = new Error("Passwords dont match");
      error.code = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ message: err.message || "Something went wrong" });
  }
};
