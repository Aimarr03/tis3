module.exports = {
  mysql: {
    database: "tis",
    username: "root",
    password: "Cyn03l3ctr0",
    host: "127.0.0.1",
    dialect: 'mysql',
    port: 3300,
    logging: false,
    define: {
      timestamps: false
    }
  },
  mongodb: {
    database: "tis",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: 'mongodb',
    logging: false,
    define: {
      timestamps: false
    },
    uri: "mongodb+srv://root:root@tis.wmg4tka.mongodb.net/"
  }
};
