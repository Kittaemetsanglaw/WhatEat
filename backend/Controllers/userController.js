const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// REGISTER: สมัครสมาชิก
exports.registerUser = async (req, res) => {
  const { email, password, name, weight, height, age, gender, healthConditions } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user without connecting healthConditions for now
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        weight,
        height,
        age,
        gender,
        // Connect healthConditions selected by the user
        healthConditions: {
          connect: healthConditions.map(condition => ({ name: condition })),
        },
      },
    });

    // Create JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};



// LOGIN: เข้าสู่ระบบ
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// ME: ดูข้อมูลตัวเอง
exports.getUserProfile = async (req, res) => {
  const userId = req.userId; // Assuming userId is set after JWT verification

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        healthConditions: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
exports.updateUser = async (req, res) => {
  const userId = req.userId; // ได้จาก middleware ตรวจสอบ JWT
  const { name, weight, height, age, gender, healthConditions } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
  }

  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (weight) updateData.weight = weight;
    if (height) updateData.height = height;
    if (age) updateData.age = age;
    if (gender) updateData.gender = gender;

    // อัปเดตเงื่อนไขสุขภาพถ้ามีส่งมา
    if (healthConditions) {
      updateData.healthConditions = {
        set: healthConditions.map(condition => ({ name: condition })), // รีเซ็ตและเพิ่มใหม่
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: { healthConditions: true },
    });

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  const userId = req.userId; // ได้จาก middleware ตรวจสอบ JWT

  console.log("🔹 userId:", userId); // ✅ Debug ดูค่าที่ได้

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: No user ID provided' });
  }

  try {
    await prisma.user.delete({ where: { id: userId } });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};



