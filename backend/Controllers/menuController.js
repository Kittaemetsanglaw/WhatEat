const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// RECOMMEND: แนะนำเมนูที่เหมาะกับโรค
exports.recommendMenus = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { healthConditions: true },
    });

    const recommendedMenus = await prisma.menu.findMany({
      where: {
        suitableFor: {
          some: {
            id: { in: user.healthConditions.map(condition => condition.id) },
          },
        },
      },
    });

    res.status(200).json(recommendedMenus);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// BESTSELLER: เมนูขายดี
exports.getBestSellerMenus = async (req, res) => {
  try {
    const bestSellerMenus = await prisma.bestSellerMenu.findMany({
      include: {
        menu: true,
      },
    });

    res.status(200).json(bestSellerMenus.map(item => item.menu));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// RECOMMENDED: เมนูแนะนำ
exports.getRecommendedMenus = async (req, res) => {
  try {
    const recommendedMenus = await prisma.recommendedMenu.findMany({
      include: {
        menu: true,
      },
    });

    res.status(200).json(recommendedMenus.map(item => item.menu));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};









// ฟังก์ชันสำหรับเพิ่มเมนูใหม่
exports.addMenu = async (req, res) => {
  const { name, description, price, image, restaurantId, categoryId, suitableFor } = req.body;

  // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบหรือไม่
  if (!name || !price || !restaurantId || !categoryId || !suitableFor) {
    return res.status(400).json({ error: 'ข้อมูลบางส่วนขาดหายไป' });
  }

  try {
    // ตรวจสอบว่า restaurantId มีอยู่ในฐานข้อมูลหรือไม่
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return res.status(400).json({ error: 'ร้านอาหารไม่พบในระบบ' });
    }

    // ตรวจสอบว่า healthConditions ที่ส่งมามีอยู่ในระบบหรือไม่
    const validConditions = await prisma.healthCondition.findMany({
      where: {
        id: { in: suitableFor },
      },
    });

    if (validConditions.length !== suitableFor.length) {
      return res.status(400).json({ error: 'บางเงื่อนไขสุขภาพไม่พบในระบบ' });
    }

    // เพิ่มเมนูใหม่ลงในฐานข้อมูล
    const newMenu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        image,
        restaurantId,
        categoryId,
        suitableFor: {
          connect: suitableFor.map(conditionId => ({ id: conditionId })),
        },
      },
    });

    // ส่งคำตอบเมื่อเพิ่มเมนูสำเร็จ
    res.status(201).json({ message: 'เพิ่มเมนูสำเร็จ', newMenu });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์', details: err.message });
  }
};

exports.addRestaurant = async (req, res) => {
  const { name, description, address, latitude, longitude, phone, website } = req.body;

  // ตรวจสอบข้อมูลที่จำเป็น
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'ข้อมูลบางส่วนขาดหายไป' });
  }

  try {
    // เพิ่มข้อมูลร้านอาหารลงในฐานข้อมูล
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        latitude,
        longitude,
        phone,
        website,
      },
    });

    // ส่งคำตอบเมื่อเพิ่มร้านอาหารสำเร็จ
    res.status(201).json({ message: 'เพิ่มร้านอาหารสำเร็จ', newRestaurant });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มร้านอาหาร', details: err.message });
  }
};

// addCategory///////

exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'ชื่อหมวดหมู่ไม่สามารถว่างได้' });
  }

  try {
    // ตรวจสอบว่าหมวดหมู่นี้มีอยู่แล้วหรือไม่
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'หมวดหมู่นี้มีอยู่ในระบบแล้ว' });
    }

    // เพิ่มหมวดหมู่ใหม่
    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({ message: 'เพิ่มหมวดหมู่สำเร็จ', newCategory });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาด', details: err.message });
  }
};











