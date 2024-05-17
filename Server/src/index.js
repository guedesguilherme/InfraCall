const express = require("express");
const app = express();
const cors = require("cors");

// Importar o controlador de usuário
const usuarioController = require("./controller/usuarios");

// Configurar middlewares
app.use(express.json());
app.use(cors());

//Rota raiz
app.use("/", usuarioController);

// Configurar a porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});