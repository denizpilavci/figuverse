const app = require('./app');
const dotenv = require('dotenv');
const migrate = require('./migrate');

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  await migrate();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}...`);
  });
}

start();

// Yakalanmayan İstisnaları (Uncaught Exceptions) Yönetimi
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Ele Alınmayan Promise Redleri (Unhandled Rejections) Yönetimi
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
