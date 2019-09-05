const Sequelize = require("sequelize");
const sequelize = require("./db");

module.exports.Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  password: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  nickname: {
    type: Sequelize.STRING,
    allowNULL: false
  }
});

// below SQL 📦 is define data base

// DROP TABLE IF EXISTS `user`;
// CREATE TABLE `user` (
//     `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//     `email` VARCHAR NULL DEFAULT NULL,
//     `password` VARCHAR NULL DEFAULT NULL,
//     `nickname` VARCHAR NULL DEFAULT NULL,
//     PRIMARY KEY (`id`)
// );
