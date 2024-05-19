const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'JlDswlkXkOMmNKWPgYEtOehZskzisIkp', {
    host: "viaduct.proxy.rlwy.net",
    port: "30022",
    dialect: "mysql"
})

module.exports = { Sequelize, sequelize };