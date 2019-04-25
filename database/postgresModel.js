const Sequelize = require('sequelize');
const sequelize = require('./postgresIndex');

const Home = sequelize.define('home', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  prop_id: {
    type: Sequelize.INTEGER
  },
  url: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}
);

sequelize
  .sync()
  .then(() => console.log('~*~*~ connected to Postgres Database "Home" ~*~*~'))
  .catch(err => console.log('Could not connect to database:', err))

module.exports = Home;