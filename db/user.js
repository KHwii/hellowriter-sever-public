const Sequelize = require("sequelize");
const sequelize = require("./db");
const Topics = require("./topics");

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

Users.associate = function(models) {
  models.Users.hasMany(Topics, {
    foreignKey: "user_Id",
    onDelete: "cascade"
  });
};

Users.sync();

module.exports.Users = Users;
