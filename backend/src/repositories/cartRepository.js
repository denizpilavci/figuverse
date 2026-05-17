const redisClient = require('../models/redis');

class CartRepository {
  // Sepet verisi Redis'te 'cart:{userId}' key'i altında JSON string olarak tutulacak
  
  async getCart(userId) {
    const data = await redisClient.get(`cart:${userId}`);
    return data ? JSON.parse(data) : { items: [] };
  }

  async saveCart(userId, cartData) {
    // Sepet verisini 7 gün (604800 saniye) boyunca Redis'te tutalım
    await redisClient.setEx(`cart:${userId}`, 604800, JSON.stringify(cartData));
    return cartData;
  }

  async clearCart(userId) {
    await redisClient.del(`cart:${userId}`);
  }
}

module.exports = new CartRepository();
