const { DataTypes } = require('sequelize');
const db = require('../Database/db');

const InfoChamados = db.sequelize.define('info_chamados', {
    id_chamado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    setor_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo_form: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao_form: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    local_form: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prioridade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    situacao: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Para fazer"
    }
}, { freezeTableName: true });

//InfoChamados.sync({force:true})

module.exports = InfoChamados;
