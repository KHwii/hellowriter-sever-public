const Sequelize = require("sequelize");
const sequelize = require("./db");
const crypto = require("crypto");

module.exports.User = sequelize.define(
  "user",
  {
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
  },
  {
    hooks: {
      // eslint-disable-next-line no-unused-vars
      afterValidate: (data, options) => {
        let shasum = crypto.createHash("sha1");
        shasum.update(data.password);
        data.password = shasum.digest("hex");
      }
    }
  }
);

// below SQL 📦 is define data base

// DROP TABLE IF EXISTS `user`;
// CREATE TABLE `user` (
//     `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//     `email` VARCHAR NULL DEFAULT NULL,
//     `password` VARCHAR NULL DEFAULT NULL,
//     `nickname` VARCHAR NULL DEFAULT NULL,
//     PRIMARY KEY (`id`)
// );
