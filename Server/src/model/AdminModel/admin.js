const { DataTypes } = require('sequelize');
const db = require('../Database/db');

const Admin = db.sequelize.define('Admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    setor: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'admins'
});

// Descomente a linha abaixo se precisar criar a tabela baseada na definição do modelo
// Admin.sync({ force: true });

module.exports = Admin;
