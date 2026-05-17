const orderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      
      const order = await orderService.createOrder(userId);
      
      res.status(201).json({
        status: 'success',
        message: 'Sipariş başarıyla oluşturuldu.',
        data: order
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      
      const orders = await orderService.getUserOrders(userId);
      
      res.status(200).json({
        status: 'success',
        results: orders.length,
        data: orders
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new OrderController();
