const Sequelize = require("sequelize");
const sequelize = require("./db");

// module.exports.
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
      references: { model: sequelize.User, key: "user_id" }
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

Topics.associate = function(models) {
  models.Topics.hasMany(models.User, {
    foreignKey: "user_Id",
    onDelete: "cascade"
  });
};

module.exports.Topics = Topics;
