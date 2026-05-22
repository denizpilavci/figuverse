const express = require('express');
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Tüm sepet işlemleri giriş yapmış kullanıcı gerektirir
router.use(protect);

router.get('/', cartController.getCart);
router.post('/add', cartController.addItem);
router.patch('/item/:productId', cartController.updateItem);
router.delete('/remove/:productId', cartController.removeItem);
router.delete('/clear', cartController.clearCart);

module.exports = router;
