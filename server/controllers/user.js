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
      throw new Error({ message: "User not found", code: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      throw new Error({ message: "Invalid credentials", code: 403 });
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
      throw new Error({ message: "User already exists", code: 400 });
    }
    if (password !== confirmPassword) {
      throw new Error({ message: "Passwords dont match", code: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json(result, token);
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message || "Something went wrong" });
  }
};
