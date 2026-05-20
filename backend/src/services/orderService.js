const orderRepository = require('../repositories/orderRepository');
const cartService = require('./cartService');

class OrderService {
  async createOrder(userId) {
    // 1. Kullanıcının sepetini getir (Güncel fiyat ve stok bilgileriyle birlikte)
    const cart = await cartService.getCart(userId);

    // 2. Sepet boş mu kontrol et
    if (!cart || cart.items.length === 0) {
      throw new Error('Sepetiniz boş. Sipariş oluşturulamaz.');
    }

    // 3. Stok yetersizliği var mı tekrar kontrol et (cartService getCart içinde yapılmıştı ama emin olalım)
    for (const item of cart.items) {
      if (item.quantity > item.stock) {
        throw new Error(`"${item.name}" ürünü için yeterli stok bulunmuyor. Kalan stok: ${item.stock}`);
      }
    }

    // 4. Veritabanında siparişi (Transaction ile) oluştur
    const order = await orderRepository.createOrderWithTransaction(userId, cart.items, cart.total);

    // 5. Sipariş başarıyla oluşturulduktan sonra kullanıcının sepetini Redis'ten temizle
    await cartService.clearCart(userId);

    return order;
  }

  async getUserOrders(userId) {
    return await orderRepository.findByUserId(userId);
  }

  async getAllOrders() {
    return await orderRepository.findAllOrders();
  }
}

module.exports = new OrderService();
