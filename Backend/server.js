const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test database connection
db.getConnection()
  .then(() => console.log("Connected to MySQL Database"))
  .catch((err) => console.error("Database connection failed:", err));

// Set up multer storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// User Registration
app.post("/register", async (req, res) => {
  const { username, password, confirmPassword, email, contact } = req.body;

  if (!username || !password || !confirmPassword || !email || !contact) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO registration (username, password, email, contact) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, contact]
    );

    res.status(201).json({
      message: "User registered successfully!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

// Product Upload (with Image Handling)
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { productName, productPrice, category, contactNumber, address } =
    req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Save image path
console.log("first",req.body)
  if (
    !productName ||
    !productPrice ||
    !category ||
    !image ||
    !contactNumber ||
    !address
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (productName, productPrice, category, image, contactNumber, address) VALUES (?, ?, ?, ?, ?, ?)",
      [productName, productPrice, category, image, contactNumber, address]
    );

    res.status(201).json({
      message: "Product added successfully!",
      productId: result.insertId,
      imageUrl: image, // Return the image URL for frontend use
    });
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

app.get("/productshow", async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});