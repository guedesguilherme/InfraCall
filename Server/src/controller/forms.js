const express = require("express");
const Forms = require("../model/FormModel/forms");
const Usuarios = require('../model/UserModel/usuarios');
const InfoChamados = require("../model/CallsModel/infoChamados");
const router = express.Router();

// Rota para listar todos os formulários
router.get("/get", async (req, res) => {
    try {
        const forms = await Forms.findAll();
        res.status(200).json(forms);
    } catch (error) {
        console.error('Erro ao listar formulários:', error);
        res.status(500).json({ error: 'Erro ao listar formulários', detalhes: error.message });
    }
});

router.post("/post", async (req, res) => {
    const { titulo, local, descricao, usuario } = req.body;

    if (!titulo || !local || !descricao || !usuario) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
    }

    try {
        // Criar o novo formulário
        const novoForm = await Forms.create({
            titulo,
            local,
            descricao,
            usuario
        });

        // Obter os dados do usuário
        const user = await Usuarios.findByPk(usuario);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Criar uma nova entrada na tabela info_chamados
        await InfoChamados.create({
            nome_usuario: user.nome,
            email_usuario: user.email,
            setor_usuario: user.setor,
            titulo_form: novoForm.titulo,
            descricao_form: novoForm.descricao,
            local_form: novoForm.local
        });

        res.status(201).json(novoForm);
    } catch (error) {
        console.error("Erro ao criar formulário:", error);
        res.status(500).json({ error: "Erro ao criar formulário", detalhes: error.message });
    }
});

// Rota para obter um formulário específico por ID
router.get("/get/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const form = await Forms.findByPk(id);

        if (!form) {
            return res.status(404).json({ error: 'Formulário não encontrado' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Erro ao obter formulário:', error);
        res.status(500).json({ error: 'Erro ao obter formulário', detalhes: error.message });
    }
});

// Rota para atualizar um formulário por ID
router.put("/put/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, local, descricao, imagens, usuario } = req.body;

    try {
        const form = await Forms.findByPk(id);

        if (!form) {
            return res.status(404).json({ error: 'Formulário não encontrado' });
        }

        await form.update({
            titulo,
            local,
            descricao,
            imagens,
            usuario
        });

        res.status(200).json(form);
    } catch (error) {
        console.error('Erro ao atualizar formulário:', error);
        res.status(500).json({ error: 'Erro ao atualizar formulário', detalhes: error.message });
    }
});

// Rota para deletar um formulário por ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const form = await Forms.findByPk(id);

        if (!form) {
            return res.status(404).json({ error: 'Formulário não encontrado' });
        }

        await form.destroy();
        res.status(200).json({ message: 'Formulário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar formulário:', error);
        res.status(500).json({ error: 'Erro ao deletar formulário', detalhes: error.message });
    }
});

module.exports = router;