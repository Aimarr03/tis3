const Sequelize = require("sequelize");
const mongoose = require("mongoose");
const config = require("../config/config");
const { defineProdukSequelize, ProdukMongoose } = require("../models/produk");

// Koneksi ke MySQL
const sequelize1 = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: config.mysql.dialect,
  port: config.mysql.port,
  logging: config.mysql.logging,
  define: config.mysql.define
});

// Koneksi ke MongoDB
mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Koneksi ke MongoDB berhasil'))
.catch(err => console.error('Gagal terkoneksi ke MongoDB:', err));

// Definisikan model Produk menggunakan Sequelize
const Produk = defineProdukSequelize(sequelize1);

module.exports = {
  sequelize1,
  Produk,
  ProdukMongoose
};
