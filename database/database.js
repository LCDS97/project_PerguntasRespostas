const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

module.exports = connection;