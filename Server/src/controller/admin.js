const express = require('express');
const Admin = require('../model/AdminModel/admin'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Rota pública
router.get('/', async (req, res) => {
    try {
        res.status(200).send({ message: 'Hello World' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor', detalhes: error.message });
    }
});

// Cadastrando um novo usuário
router.post('/post', async (req, res) => {
    const { nome, sobrenome, email, senha, confirmacaoSenha, setor } = req.body;

    if (!nome || !sobrenome || !email || !senha || !confirmacaoSenha || !setor) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    if (senha !== confirmacaoSenha) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    try {
        // Verificar se já existe um usuário com o mesmo e-mail
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Este e-mail já está em uso' });
        }

        // Se o e-mail não estiver em uso, criamos um novo usuário
        const hashedSenha = await bcrypt.hash(senha, 10);
        const novoAdmin = await Admin.create({
            nome,
            sobrenome,
            email,
            senha: hashedSenha,
            setor
        });

        return res.status(201).json(novoAdmin);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário', detalhes: error.message });
    }
});

// Usuário cadastrado entrando 
router.post('/post/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const senhaValida = await bcrypt.compare(senha, admin.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const token = jwt.sign({ id: admin.admin_id, email: admin.email }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem sucedido', admin, token });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
    }
});

module.exports = router;
