const Sequelize = require('sequelize');
const sequelize = new Sequelize('gallery', 'liezelmanalo', '', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => {
    console.log('****** connected to postgres ******')
  })
  .catch(err => {
    console.log('Unable to connect to PostgreSQL:', err)
  })


module.exports = sequelize;

// cat seedData.json | psql -h localhost gallery -c "COPY homes (id, location, title, urls) FROM STDIN;"
