const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// เปิดใช้งาน CORS
app.use(cors());

// ใช้ middleware สำหรับอ่าน JSON body
app.use(express.json());

// รวมเส้นทาง
const userRoutes = require('../Routes/userRoutes');
const healthConditionRoutes = require('../Routes/healthConditionRoutes');
const menuRoutes = require('../Routes/menuRoutes');
const searchRoutes = require('../Routes/searchRoutes');
const sortRoutes = require('../Routes/sortRoutes');

// เส้นทางสำหรับสุขภาพ
app.use('/api', healthConditionRoutes);

// เส้นทางสำหรับผู้ใช้
app.use('/api', userRoutes);

// เส้นทางสำหรับเมนู
app.use('/api', menuRoutes);

// search
app.use('/api', searchRoutes);

// sort
app.use('/api' , sortRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
