const { Transaksi, TransaksiMongoose } = require('../services/databaseService');

exports.createTransaksi = async (req, res, next) => {
  try {
    const { nama_pelanggan, produk_id, jumlah } = req.body;
    //const transaksi = await Transaksi.create({ nama_pelanggan, produk_id, jumlah });
    const transaksis = new TransaksiMongoose({ nama_pelanggan, produk_id, jumlah });
    await transaksis.save();
    console.log("Transaksi telah dibuat");
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
