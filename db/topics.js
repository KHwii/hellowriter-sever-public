const Sequelize = require("sequelize");
const sequelize = require("./db");
const Users = require("./user");

const Topics = sequelize.define(
  "topics",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNULL: false,
    },
    topic_text: {
      type: Sequelize.STRING,
      allowNULL: false
    },
    publish_allow: {
      type: Sequelize.INTEGER,
      allowNULL: false
    }
  },
  {
    charset: "utf8",
    collate: "utf8_unicode_ci",
    underscored: true,
    freezeTableName: true,
    tableName: "topics",
    timestamps: false
  }
);
Topics.sync();
module.exports.Topics = Topics;
