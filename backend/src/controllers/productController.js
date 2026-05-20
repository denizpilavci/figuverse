const productService = require('../services/productService');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const filters = {
        universe: req.query.universe,
        category_id: req.query.category_id,
        search: req.query.search
      };
      
      const products = await productService.getAllProducts(filters);
      
      res.status(200).json({
        status: 'success',
        results: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: product
      });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = { ...req.body };
      
      // Eğer dosya yüklendiyse image_url alanına ekle
      if (req.file) {
        // Backend localhost:5000 veya ayarlı host üzerinde çalıştığı için URL oluştur
        productData.image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      } else if (!productData.image_url) {
        productData.image_url = '/images/samurai.png'; // Varsayılan fallback
      }

      // Sadece yetkili adminler buraya girebilir (middleware ile korunacak)
      const newProduct = await productService.createProduct(productData);
      
      res.status(201).json({
        status: 'success',
        message: 'Ürün başarıyla oluşturuldu.',
        data: newProduct
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      
      res.status(200).json({
        status: 'success',
        message: 'Ürün başarıyla güncellendi.',
        data: updatedProduct
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      
      res.status(200).json({
        status: 'success',
        message: result.message
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new ProductController();
