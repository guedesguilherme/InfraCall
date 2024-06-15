const express = require('express');
const { Op } = require("sequelize")
const InfoChamados = require('../model/CallsModel/infoChamados');

const router = express.Router();

// Rota para listar todas as linhas da tabela info_chamados
/*router.get('/', async (req, res) => {
    try {
        const infoChamados = await InfoChamados.findAll();
        res.status(200).json(infoChamados);
    } catch (error) {
        console.error('Erro ao listar informações de chamados:', error);
        res.status(500).json({ error: 'Erro ao listar informações de chamados', details: error.message });
    }
});*/

router.get('/', async (req, res) => {
    try {
        const infoChamados = await InfoChamados.findAll({ where: { situacao: { [Op.ne]: 'Feito' } } });
        res.status(200).json(infoChamados);
    } catch (error) {
        console.error('Erro ao listar informações de chamados:', error);
        res.status(500).json({ error: 'Erro ao listar informações de chamados', details: error.message });
    }
});

router.get('/done', async (req, res) => {
    try {
        // Modifique a condição 'where' para filtrar registros onde a situação é 'Feito'
        const usuariosFeitos = await InfoChamados.findAll({ where: { situacao: 'Feito' } });
        res.status(200).json(usuariosFeitos);
    } catch (error) {
        console.error('Erro ao listar usuários com situação "Feito":', error);
        res.status(500).json({ error: 'Erro ao listar usuários com situação "Feito"', details: error.message });
    }
});

/*router.put('/:idChamado/prioridade', async (req, res) => {
    const { idChamado } = req.params;
    const { prioridade } = req.body;

    try {
        // Atualiza a prioridade do chamado no banco de dados
        await InfoChamados.update({ prioridade }, { where: { id_chamado: idChamado } });
        res.status(200).json({ message: 'Prioridade atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar prioridade do chamado:', error);
        res.status(500).json({ error: 'Erro ao atualizar prioridade do chamado', details: error.message });
    }
});*/

/*router.put('/:idChamado/att', async (req, res) => {
    const { idChamado } = req.params;
    const { prioridade, situacao } = req.body;

    try {
        await InfoChamados.update({ prioridade, situacao }, { where: { id_chamado: idChamado } });
        res.status(200).json({ message: 'Prioridade e situação atualizadas com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar prioridade e situação do chamado:', error);
        res.status(500).json({ error: 'Erro ao atualizar prioridade e situação do chamado', details: error.message });
    }
});

// Adicionando uma nova rota para atualizar o responsável do chamado
router.put('/:idChamado/atribuir', async (req, res) => {
    const { idChamado } = req.params;
    const { responsavel } = req.body; // Espera receber o ID do administrador

    try {
        await InfoChamados.update({ responsavel }, { where: { id_chamado: idChamado } });
        res.status(200).json({ message: 'Responsável atribuído com sucesso' });
    } catch (error) {
        console.error('Erro ao atribuir responsável ao chamado:', error);
        res.status(500).json({ error: 'Erro ao atribuir responsável ao chamado', details: error.message });
    }
});*/

router.put('/:idChamado/att', async (req, res) => {
    const { idChamado } = req.params;
    const { prioridade, situacao, responsavel } = req.body;

    try {
        await InfoChamados.update({ prioridade, situacao, responsavel }, { where: { id_chamado: idChamado } });
        res.status(200).json({ message: 'Prioridade, situação e responsável atualizados com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar prioridade, situação e responsável do chamado:', error);
        res.status(500).json({ error: 'Erro ao atualizar prioridade, situação e responsável do chamado', detalhes: error.message });
    }
});

router.put('/:idChamado/atribuir', async (req, res) => {
    const { idChamado } = req.params;
    const { responsavel } = req.body;

    try {
        await InfoChamados.update({ responsavel }, { where: { id_chamado: idChamado } });
        res.status(200).json({ message: 'Responsável atribuído com sucesso' });
    } catch (error) {
        console.error('Erro ao atribuir responsável ao chamado:', error);
        res.status(500).json({ error: 'Erro ao atribuir responsável ao chamado', detalhes: error.message });
    }
});


module.exports = router;
