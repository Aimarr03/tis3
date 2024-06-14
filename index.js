require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const { sequelize1, Produk } = require("./services/databaseService");
const produkController = require("./controllers/produkController");
const transaksiController = require("./controllers/transaksiController");
const transferController = require("./controllers/transferController");

// Middleware untuk mengizinkan aplikasi mengonsumsi JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Koneksi ke MongoDB berhasil');
}).catch(err => {
  console.error('Gagal terkoneksi ke MongoDB:', err);
  process.exit(1);
});

// Routes untuk produk dan transaksi
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/create_produk.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/create_produk.html"));
});

app.post("/create_produk.html", async (req, res, next) => {
  try {
    await produkController.createProduk(req, res, next);
  } catch (err) {
    console.error("Gagal membuat produk:", err);
    res.status(500).send("Gagal membuat produk");
  }
});


app.get("/create_transaksi.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/create_transaksi.html"));
});

app.post("/create_transaksi.html", async (req, res) => {
  try {
    await transaksiController.createTransaksi(req, res);
  } catch (err) {
    console.error("Gagal membuat transaksi:", err);
    res.status(500).send("Gagal membuat transaksi");
  }
});

app.get("/transfer_produk.html", async (req, res) => {
  try {
    await transferController.transferDataToMySQL();
    res.sendFile(path.join(__dirname, "/transfer_produk.html"));
  } catch (err) {
    console.error("Gagal melakukan transfer: ", err);
    res.status(500).send("Gagal melakukan transfer data");
  }
});

app.post("/transfer_produk.html", async (req, res) => {
  try {
    await transferController.backToHomePage(req, res);
  } catch (err) {
    console.error("Gagal melakukan transfer: ", err);
    res.status(500).send("Gagal melakukan transfer data");
  }
});

// Route untuk halaman read.html
app.get("/read.html", async (req, res) => {
  try {
    const products = await produkController.getAllProduk();
    res.json({ products }); // Mengembalikan data produk dalam format JSON
  } catch (err) {
    console.error("Gagal mendapatkan produk:", err);
    res.status(500).send("Gagal mendapatkan produk");
  }
});

// Inisialisasi database Sequelize
async function initializeDatabases() {
  try {
    await sequelize1.sync({ force: true }); // Hapus dan buat ulang tabel
    console.log("Sinkronisasi database selesai");
  } catch (err) {
    console.error("Gagal sinkronisasi database:", err);
    process.exit(1);
  }
}

async function main() {
  await initializeDatabases();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan pada  "http://localhost:${PORT}"`);
  });
}

main();