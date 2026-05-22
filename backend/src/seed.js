const bcrypt = require('bcryptjs');
const db = require('./models/db');

const admins = [
  { name: 'Admin User', email: 'admin@figuverse.com', password: 'password123' },
];

const categories = [
  { name: 'Aksiyon Figürleri', slug: 'action-figures' },
  { name: 'Statüler', slug: 'statues' },
  { name: 'Funko Pop', slug: 'funko-pop' },
];

async function seed() {
  try {
    for (const admin of admins) {
      const existing = await db.query('SELECT id FROM users WHERE email = $1', [admin.email]);
      if (existing.rows.length > 0) {
        console.log(`Admin "${admin.email}" zaten mevcut, atlanıyor.`);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(admin.password, salt);

      await db.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, 'admin')`,
        [admin.name, admin.email, password_hash]
      );

      console.log(`Admin "${admin.email}" başarıyla oluşturuldu.`);
    }

    for (const cat of categories) {
      const existing = await db.query('SELECT id FROM categories WHERE slug = $1', [cat.slug]);
      if (existing.rows.length > 0) {
        console.log(`Kategori "${cat.name}" zaten mevcut, atlanıyor.`);
        continue;
      }

      await db.query(
        `INSERT INTO categories (name, slug) VALUES ($1, $2)`,
        [cat.name, cat.slug]
      );

      console.log(`Kategori "${cat.name}" başarıyla oluşturuldu.`);
    }

    console.log('Seed işlemi tamamlandı.');
  } catch (err) {
    console.error('Seed hatası:', err.message);
  } finally {
    process.exit(0);
  }
}

seed();
