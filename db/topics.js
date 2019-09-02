const Sequelize = require("sequelize");
const sequelize = require("./db");

module.exports.Topics = sequelize.define("topics", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNULL: false
  },
  topic_text: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  publish_allow: {
    type: Sequelize.INTEGER,
    allowNULL: false
  }
});
