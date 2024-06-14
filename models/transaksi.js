const { DataTypes } = require("sequelize");
const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
  nama_pelanggan: { type: String, required: true },
  produk_id: { type: Number, required: true },
  jumlah: { type: Number, required: true }
});

const TransaksiMongoose = mongoose.model('Transaksi', transaksiSchema);

const defineTransaksiSequelize = sequelize => {
  return sequelize.define("transaksi", {
    nama_pelanggan: { type: DataTypes.STRING, allowNull: false },
    produk_id: { type: DataTypes.INTEGER, allowNull: false },
    jumlah: { type: DataTypes.INTEGER, allowNull: false }
  });
};

module.exports = { TransaksiMongoose, defineTransaksiSequelize };
