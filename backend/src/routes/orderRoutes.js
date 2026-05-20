const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Sadece giriş yapmış kullanıcılar sipariş oluşturabilir ve görebilir
router.use(protect);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);

// Sadece adminler tüm siparişleri görebilir
router.get('/', restrictTo('admin'), orderController.getAllOrders);

module.exports = router;
