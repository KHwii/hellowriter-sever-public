const Sequelize = require("sequelize");
const sequelize = require("./db");

const Articles = sequelize.define("articles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topic_id: {
    type: Sequelize.INTEGER,
    allowNULL: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNULL: false,
  },
  topic_text: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  title: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  article_text: {
    type: Sequelize.TEXT,
    allowNULL: false
  },
  burn_date: {
    type: Sequelize.DATE,
    allowNULL: true
  },
  will_public_at: {
    type: Sequelize.DATE,
    allowNULL: true
  },
  publish_status: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  tags_1: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  tags_2: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  tags_3: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  article_stash: {
    type: Sequelize.BOOLEAN,
    allowNULL: true
  }
});
Articles.sync();
module.exports.Articles = Articles;
