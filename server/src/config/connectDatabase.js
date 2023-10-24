const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ql_phongtro', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connecyDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connecyDatabase;
