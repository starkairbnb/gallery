const Sequelize = require('sequelize');
const sequelize = new Sequelize('gallery', 'liezelmanalo', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: { maxConnections: 20, maxIdleTime: 30 }
})

sequelize.authenticate()
  .then(() => {
    console.log('****** connected to postgres ******')
  })
  .catch(err => {
    console.log('Unable to connect to PostgreSQL:', err)
  })


module.exports = sequelize;