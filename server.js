const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4000; // Use Render's PORT variable or default to 4000

// Replace with a database in production
const users = [
  { username: "user", password: bcrypt.hashSync("password123", 10) },
  { username: "admin", password: bcrypt.hashSync("admin123", 10) },
];

const SECRET_KEY = "your_jwt_secret_key"; // Replace with a secure secret key in production

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  res.status(401).json({ message: "Invalid username or password" });
});

// Example protected route
app.get("/login", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ message: `Hello, ${decoded.username}!` });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
