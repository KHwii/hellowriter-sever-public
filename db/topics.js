const Sequelize = require("sequelize");
const sequelize = require("../db");
const crypto = require("crypto");

module.exports.Topics = sequelize.define(
  "topics",
  {
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
  }
  // {
  //   hooks: {
  //     // eslint-disable-next-line no-unused-vars
  //     afterValidate: (data, options) => {
  //       let shasum = crypto.createHash("sha1");
  //       shasum.update(data.password);
  //       data.password = shasum.digest("hex");
  //     }
  //   }
  // }
);
