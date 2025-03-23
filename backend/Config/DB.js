// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/DB', {
            useNewUrlParser: true,  // เพิ่มตัวเลือกนี้เพื่อใช้งานการเชื่อมต่อแบบใหม่
            useUnifiedTopology: true,  // ใช้ค่าพื้นฐานเพื่อความเสถียร
        });
        console.log('DB connected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);  // ถ้าเชื่อมต่อไม่ได้ ให้หยุดโปรแกรม
    }
};

module.exports = connectDB;
