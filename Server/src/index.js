const express = require('express');
const app = express();
const cors = require('cors');

// Importar os controladores
const usuarioController = require('./controller/usuarios');
const formController = require('./controller/forms');
const infoChamados = require('./controller/infoChamados');
const AdminController = require('./controller/admin'); 

// Configurar middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/user', usuarioController);
app.use('/form', formController);
app.use('/info', infoChamados);
app.use('/admin', AdminController);


// Rota raiz para teste
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World' });
});

// Configurar a porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
