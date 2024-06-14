require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produkRoutes = require('./routes/produkRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');

const app = express();

// Middleware untuk mengizinkan aplikasi mengonsumsi JSON
app.use(express.json());

// Routes untuk produk dan transaksi
app.use('/api/produk', produkRoutes);
app.use('/api/transaksi', transaksiRoutes);

// Middleware untuk menangani kesalahan
app.use(errorHandler);

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Mengatur dokumentasi Swagger
setupSwagger(app);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});