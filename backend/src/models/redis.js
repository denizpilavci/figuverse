const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    tls: process.env.REDIS_TLS === 'true',
    servername: process.env.REDIS_HOST || 'localhost'
  }
});

client.on('error', (err) => console.error('❌ Redis Client Error', err));
client.on('connect', () => console.log('✅ Connected to Redis'));

// Asenkron olarak bağlan (V4 redis client gerektirir)
client.connect().catch(console.error);

module.exports = client;
