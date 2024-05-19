const express = require("express");
const Usuarios = require("../model/UserModel/usuarios");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const router = express.Router();

// Rota pública
router.get("/", async (req, res) => {
    try {
        res.status(200).send({ message: "Hello World" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erro interno do servidor", detalhes: error.message });
    }
});

// Cadastrando um novo usuário
router.post("/post", async (req, res) => {
    const { nome, sobrenome, email, senha, confirmacaoSenha, setor } = req.body;

    if (!nome || !sobrenome || !email || !senha || !confirmacaoSenha || !setor) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
    }

    if (senha !== confirmacaoSenha) {
        return res.status(400).json({ error: "As senhas não coincidem" });
    }

    try {
        // Verificar se já existe um usuário com o mesmo e-mail
        const existingUser = await Usuarios.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Este e-mail já está em uso" });
        }

        // Se o e-mail não estiver em uso, criamos um novo usuário
        const hashedSenha = await bcrypt.hash(senha, 10);
        const novoUsuario = await Usuarios.create({
            nome,
            sobrenome,
            email,
            senha: hashedSenha,
            setor
        });

        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({ error: "Erro ao cadastrar usuário", detalhes: error.message });
    }
});

// Usuário cadastrado entrando 
router.post('/post/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const usuario = await Usuarios.findOne({ where: { email } });
  
      if (!usuario) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }
  
      const token = jwt.sign({ id: usuario.user_id, email: usuario.email }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: "Login bem sucedido", usuario, token });
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
    }
  });
  

module.exports = router;
