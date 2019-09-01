const Sequelize = require ('sequelize');
const secret = require ('config/secret');

const sequelize = new Sequelize(
    global.gConfig.database,
    secret.DB_ID,
    secret.DB_PASSWORD,
    {
      'host': secret.DB_HOST,
      'dialect': 'mysql'
    }
);
sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

export default sequelize;