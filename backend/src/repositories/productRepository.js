const db = require('../models/db');

class ProductRepository {
  async findAll(filters = {}) {
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const values = [];
    let count = 1;

    if (filters.universe) {
      query += ` AND p.universe = $${count}`;
      values.push(filters.universe);
      count++;
    }

    if (filters.category_id) {
      query += ` AND p.category_id = $${count}`;
      values.push(filters.category_id);
      count++;
    }

    if (filters.search) {
      query += ` AND p.name ILIKE $${count}`;
      values.push(`%${filters.search}%`);
      count++;
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await db.query(query, values);
    return result.rows;
  }

  async findById(id) {
    const result = await db.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [id]
    );
    return result.rows[0];
  }

  async create(product) {
    const { name, description, price, stock, category_id, image_url, universe } = product;
    const result = await db.query(
      `INSERT INTO products (name, description, price, stock, category_id, image_url, universe) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description, price, stock, category_id, image_url, universe]
    );
    return result.rows[0];
  }

  async update(id, product) {
    const { name, description, price, stock, category_id, image_url, universe } = product;
    const result = await db.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, stock = $4, category_id = $5, image_url = $6, universe = $7 
       WHERE id = $8 RETURNING *`,
      [name, description, price, stock, category_id, image_url, universe, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = new ProductRepository();
