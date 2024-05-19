const { DataTypes } = require('sequelize');
const db = require('../Database/db');
const Usuarios = require('../UserModel/usuarios');

const Forms = db.sequelize.define('forms', {
    form_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    local: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagens: {
        type: DataTypes.STRING,
        allowNull: true
    },
    situacao: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Para fazer"
    },
    usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: 'user_id'
        }
    }
}, { freezeTableName: true });

// Define the relationship between Forms and Usuarios
Forms.belongsTo(Usuarios, { foreignKey: 'usuario', as: 'usuarioInfo' });

//Forms.sync({ force: true });

module.exports = Forms;

