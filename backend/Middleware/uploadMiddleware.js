const multer = require('multer');
const path = require('path');
const fs = require('fs');

// จับคู่ค่าของ suitableFor (ตัวเลข) กับชื่อโรค
const diseaseCategories = {
  3: 'Diabetes',
  4: 'Heart Disease',
  5: 'Hypertension',
};

// ตั้งค่าที่เก็บรูป
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // รับประเภทโรคจาก body (สมมุติว่าเป็น array)
    const diseaseCategoryIds = req.body.suitableFor;  // สมมุติว่าได้รับในรูปแบบนี้

    if (!diseaseCategoryIds || diseaseCategoryIds.length === 0) {
      return cb(new Error("ประเภทโรคไม่ถูกต้อง"), null);
    }

    // แปลง id ของโรคเป็นชื่อโรค
    const category = diseaseCategories[diseaseCategoryIds[0]];  // ใช้โรคแรกจาก array

    if (!category) {
      return cb(new Error("ประเภทโรคไม่รองรับ"), null);
    }

    // สร้างเส้นทางของโฟลเดอร์ที่จะเก็บไฟล์
    const uploadFolder = path.join(__dirname, 'images', category);  // images/โรค

    // ตรวจสอบว่าโฟลเดอร์นี้มีอยู่หรือไม่ ถ้าไม่ให้สร้างมันขึ้นมา
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });  // สร้างโฟลเดอร์ถ้ายังไม่มี
    }

    cb(null, uploadFolder);  // กำหนดที่อยู่ที่จะบันทึกไฟล์
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์ให้ไม่ซ้ำกัน
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // ตั้งชื่อไฟล์เป็น timestamp + ชื่อเดิม
  }
});

const upload = multer({ storage: storage });

module.exports = upload; // ส่งออกการตั้งค่า middleware นี้ไปใช้งาน
