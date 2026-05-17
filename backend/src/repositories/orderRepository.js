const db = require('../models/db');

class OrderRepository {
  async createOrderWithTransaction(userId, cartItems, total) {
    const client = await db.getClient();
    try {
      await client.query('BEGIN'); // Transaction başlat

      // 1. Siparişi oluştur
      const orderResult = await client.query(
        'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',
        [userId, total, 'pending']
      );
      const order = orderResult.rows[0];

      // 2. Sipariş kalemlerini (order_items) ekle ve stokları düş
      for (const item of cartItems) {
        // Sipariş detayını ekle
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
          [order.id, item.product_id, item.quantity, item.unit_price]
        );

        // Stok miktarını azalt
        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }

      await client.query('COMMIT'); // İşlemleri onayla
      return order;
    } catch (error) {
      await client.query('ROLLBACK'); // Hata olursa işlemleri geri al
      throw error;
    } finally {
      client.release(); // Client'ı havuza geri bırak
    }
  }

  async findByUserId(userId) {
    const result = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }
}

module.exports = new OrderRepository();
