const { Produk } = require('../services/databaseService');

exports.createProduk = async (req, res) => {
  try {
    const { nama, harga, stok, kategori } = req.body;

    // Membuat produk baru menggunakan model Sequelize
    //Menggunakan SQL
    //const produk = await Produk.create({ nama, harga, stok, kategori, data_sql_original: true }); 
    const produks = new ProdukMongoose({ nama, harga, stok, kategori });
    await produks.save();// Menambahkan data_sql_original
    console.log("Produk telah ditambahkan:", produk);
    res.redirect('/');
  } catch (err) {
    console.error("Gagal membuat produk:", err);
    res.status(500).send("Gagal membuat produk");
  }
};

exports.getAllProduk = async () => {
  try {
    // Mendapatkan semua produk dari database MySQL menggunakan model Sequelize
    const produkSequelize = await Produk.findAll();

    return produkSequelize;
  } catch (err) {
    throw new Error("Gagal mendapatkan produk dari database MySQL");
  }
};
