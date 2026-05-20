const express = require('express');
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Herkese açık rotalar (Ürünleri listeleme ve detay görme)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Sadece Admin yetkisi gerektiren rotalar
// Tüm rotaları koruma altına al (Aşağıdaki rotalar için geçerli)
const upload = require('../utils/upload');
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
