const Sequelize = require("sequelize");
const sequelize = require("./db");

const Reads = sequelize.define("read", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNULL: false
  },
  article_id: {
    type: Sequelize.INTEGER,
    allowNULL: false
  },
  rating: {
    type: Sequelize.STRING,
    allowNULL: false
  }
});
Reads.sync();

module.exports.Reads = Reads;
