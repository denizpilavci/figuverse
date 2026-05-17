const cartService = require('../services/cartService');

class CartController {
  async getCart(req, res) {
    try {
      // Auth middleware req.user objesini dolduruyor
      const userId = req.user.id;
      const cart = await cartService.getCart(userId);
      
      res.status(200).json({
        status: 'success',
        data: cart
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async addItem(req, res) {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      if (!product_id || !quantity || quantity <= 0) {
        return res.status(400).json({ status: 'error', message: 'Geçerli bir ürün IDsi ve miktar girin.' });
      }

      const updatedCart = await cartService.addItemToCart(userId, product_id, quantity);
      
      res.status(200).json({
        status: 'success',
        message: 'Ürün sepete eklendi.',
        data: updatedCart
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async removeItem(req, res) {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;

      const updatedCart = await cartService.removeItemFromCart(userId, productId);
      
      res.status(200).json({
        status: 'success',
        message: 'Ürün sepetten çıkarıldı.',
        data: updatedCart
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const userId = req.user.id;
      const emptyCart = await cartService.clearCart(userId);
      
      res.status(200).json({
        status: 'success',
        message: 'Sepet temizlendi.',
        data: emptyCart
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new CartController();
