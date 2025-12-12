import express from "express";
import { connectToDB } from "../libraries/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  //   console.log(username);
  try {
    const db = await connectToDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    // Check empty fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (rows.length > 0) {
      return res.json({ message: "user already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10); // Higher the salt number more safer it will be
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashPassword]
    );
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   console.log(username);
  try {
    const db = await connectToDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // Check empty fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "user does not exist" });
    }
    const isMatchedPassword = await bcrypt.compare(password, rows[0].password);
    if (!isMatchedPassword) {
      return res.status(401).json({ message: "password does not match" });
    }
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "3h",
    });
    res
      .status(201)
      .json({ token: token, message: "user logged in successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Verify the user
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

// Home page
router.get("/home", verifyToken, async (req, res) => {
  try {
    const db = await connectToDB();
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.userId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "user does not exist" });
    }
    return res.status(201).json({ user: rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});

export default router;
