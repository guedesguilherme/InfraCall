const db = require("../Database/db");

const Usuarios = db.sequelize.define('usuarios', {
    user_id: {
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
    nome: {
        type: db.Sequelize.STRING(45),
        allowNull: false
    },
    sobrenome: {
        type: db.Sequelize.STRING(45),
        allowNull: false
    },
    setor: {
        type: db.Sequelize.STRING(45),
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING(200),
        allowNull: false
    }

}, { freezeTableName: true,
    tableName: "usuarios"
 });

//Usuarios.sync({ force: false });

module.exports = Usuarios;