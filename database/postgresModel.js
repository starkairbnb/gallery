const Sequelize = require('sequelize');
const sequelize = require('./postgresIndex');

const Home = sequelize.define('home', {
  prop_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.TEXT
  },
  location: {
    type: Sequelize.TEXT
  },
  urls: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
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