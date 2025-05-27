require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db"); // Import file kết nối MongoDB
const User = require("./src/models/User");
const userRoutes = require("./src/routes/userRoutes"); // Import routes của User
const authRoutes = require("./src/routes/authRoute"); // ✅ Thêm dòng này
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

const user = {
  id: "123456", // bạn có thể thay bằng ObjectId thật từ Mongo
  username: "vietlequoc"
};

const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

console.log(token);

// ✅ Kích hoạt CORS (Chỉ cần một lần)
app.use(cors({
  origin: "http://localhost:3000", // Chỉ cho phép frontend chạy ở cổng 3000
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
  allowedHeaders: ["Content-Type", "Authorization"], // Các headers được phép
}));

// Middleware để parse JSON
app.use(express.json());

// Gọi hàm kết nối MongoDB
connectDB();

// Route cơ bản
app.get("/", (req, res) => {
  res.send("Hello from Node.js & MongoDB!");
});
app.use("/api/auth", authRoutes); // ✅ Thêm dòng này

// API tạo user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sử dụng routes cho User
app.use("/api/users", userRoutes);

// Lắng nghe server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
