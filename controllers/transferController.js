console.log("Halaman Transfer");
const { Produk, ProdukMongoose } = require('../services/databaseService');

exports.transferDataToMySQL = async () => {
  try {
    // Fetch all products from MongoDB
    const mongooseProducts = await ProdukMongoose.find();

    // Insert each product into MySQL
    for (const product of mongooseProducts) {
      await Produk.create({
        nama: product.nama,
        harga: product.harga,
        stok: product.stok,
        kategori: product.kategori,
        data_sql_original: false
      });
    }

    console.log("Data transferred from MongoDB to MySQL successfully");
  } catch (err) {
    console.error("Error transferring data:", err);
  }
};

exports.backToHomePage = async (req, res) => {
  try {
    await exports.transferDataToMySQL();
    res.redirect('/');
  } catch (err) {
    console.error("Error transferring data:", err);
    res.status(500).send("Failed to transfer data and return to homepage");
  }
};