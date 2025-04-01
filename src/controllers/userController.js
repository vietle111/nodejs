const User = require("../models/User");

// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Tạo user mới
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật user theo ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
