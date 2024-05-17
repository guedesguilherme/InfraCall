const db = require("./db");

const Usuarios = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: db.Sequelize.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: db.Sequelize.STRING(200),
        allowNull: false
    },
    setor: {
        type: db.Sequelize.STRING(45),
        allowNull: false
    },
    nome: {
        type: db.Sequelize.STRING(45),
        allowNull: false
    },
    sobrenome: {
        type: db.Sequelize.STRING(45),
        allowNull: false
    }
    
}, { freezeTableName: true });

module.exports = Usuarios;