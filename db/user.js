const Sequelize = require("sequelize");
const sequelize = require("./db");

const Users = sequelize.define("users", {
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

Users.sync();

module.exports.Users = Users;
