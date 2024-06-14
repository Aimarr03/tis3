const { DataTypes } = require("sequelize");
const mongoose = require("mongoose");

const produkSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
  kategori: { type: String, required: true },
});

const ProdukMongoose = mongoose.model("Produk", produkSchema);

const defineProdukSequelize = (sequelize) => {
  return sequelize.define("produk", {
    nama: { type: DataTypes.STRING, allowNull: false },
    harga: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stok: { type: DataTypes.INTEGER, allowNull: false },
    kategori: { type: DataTypes.STRING, allowNull: false },
    data_sql_original: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true} // Menambahkan nilai default
  });
};


module.exports = {
  ProdukMongoose,
  defineProdukSequelize
};
