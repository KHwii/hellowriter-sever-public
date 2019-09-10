const Sequelize = require("sequelize");
const secret = require("../config/secret");

// sync: {force:true} 모델이 기존과 다르면 덮어씌운다. 자동으로 생성해주는 기능은 아니다. 그냥 놔눠도 자동 생성 해준다.
// 자동생성때 덮어씌울지 말지를 결정한다.
const sequelize = new Sequelize(
  global.gConfig.database,
  secret.DB_ID,
  secret.DB_PASSWORD,
  {
    host: secret.DB_HOST,
    logging: console.log,
    dialect: "mysql",
    timezone: "+09:00",
    // sync: { force: true },
    define: {
      charset: "utf8",
      timestamps: true
    },
    pool: {
      max: 30,
      idle: 30000,
      acquire: 60000
    }
  }
);
sequelize
  .authenticate()
  .then(async () => {
    console.log("🗄 Connection has been established successfully.");
  })
  .catch(err => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = sequelize;
