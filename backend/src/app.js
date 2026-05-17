const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // İstemci (Frontend) isteklerine izin ver
app.use(express.json()); // JSON formatındaki istekleri parse et
app.use(express.urlencoded({ extended: true }));

// Temel Test Endpoint'i
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'FiguVerse API is running' });
});

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Rotalar
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Tanımlanmayan Rotalar (404)
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found on this server`
  });
});

module.exports = app;
