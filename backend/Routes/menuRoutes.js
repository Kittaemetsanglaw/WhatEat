const express = require('express');
const router = express.Router();
const { addMenu, addRestaurant, addCategory, recommendMenus } = require('../Controllers/menuController');

// เส้นทางสำหรับเพิ่มเมนู
router.post('/menus', addMenu);

// เส้นทางสำหรับเพิ่มร้านอาหาร
router.post('/addRestaurant', addRestaurant);

// เส้นทางสำหรับเพิ่มหมวดหมู่
router.post('/categories', addCategory);

// เส้นทางสำหรับแนะนำเมนู
router.get('/recommendMenus/:userId', recommendMenus);

module.exports = router;

