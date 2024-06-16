import React, { useEffect, useState } from 'react';
import AppFetch from '../../axios/config';
import '../InfoChamadosTable/InfoChamadosTable.css';

const InfoChamados = () => {
    const [data, setData] = useState([]);
    const [priorities, setPriorities] = useState({});
    const [administrators, setAdministrators] = useState([]);
    const [adminId, setAdminId] = useState(1); // Aqui você precisa definir o ID do administrador logado
    const [solutionDraft, setSolutionDraft] = useState({});
    const [filteredChamados, setFilteredChamados] = useState([]);

    const fetchData = async () => {
        try {
            const response = await AppFetch.get('/info');
            const adminResponse = await AppFetch.get('/admin');

            const initialData = response.data.reduce((acc, item) => {
                acc[item.id_chamado] = {
                    prioridade: item.prioridade,
                    situacao: item.situacao,
                    responsavel: item.responsavel,
                    solucao: item.solucao // Adicionar campo solução
                };
                return acc;
            }, {});

            const initialSolutionDraft = response.data.reduce((acc, item) => {
                acc[item.id_chamado] = item.solucao || ''; // Se solução for nula, inicializa com string vazia
                return acc;
            }, {});

            setData(response.data);
            setPriorities(initialData);
            setAdministrators(adminResponse.data);
            setSolutionDraft(initialSolutionDraft);

            return response.data; // Retorna os dados para o caso de necessidade de referência futura
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Chama fetchData apenas uma vez ao montar o componente
    }, []);

    const handlePriorityChange = async (id, newPriority) => {
        try {
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    prioridade: newPriority
                }
            }));

            const item = data.find(item => item.id_chamado === id);
            if (!item) {
                console.error('Item não encontrado');
                return;
            }

            await AppFetch.put(`/info/${id}/att`, {
                prioridade: newPriority,
                situacao: item.situacao,
                responsavel: priorities[id]?.responsavel // Manter o responsável atual
            });
        } catch (error) {
            console.error('Erro ao atualizar prioridade:', error);
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    prioridade: prevPriorities[id]?.prioridade
                }
            }));
        }
    };

    const handleAdminChange = async (e) => {
        const selectedAdminId = parseInt(e.target.value);
        setAdminId(selectedAdminId);
    };

    const handleSearchChamados = async () => {
        try {
            const response = await AppFetch.get(`/info/admin/${adminId}`);
            setFilteredChamados(response.data);
        } catch (error) {
            console.error('Erro ao buscar chamados atribuídos ao administrador:', error);
        }
    };

    const handleSituationChange = async (id, newSituation) => {
        try {
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    situacao: newSituation
                }
            }));

            const item = data.find(item => item.id_chamado === id);
            if (!item) {
                console.error('Item não encontrado');
                return;
            }

            await AppFetch.put(`/info/${id}/att`, {
                prioridade: item.prioridade,
                situacao: newSituation,
                responsavel: priorities[id]?.responsavel // Manter o responsável atual
            });
        } catch (error) {
            console.error('Erro ao atualizar situação:', error);
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    situacao: prevPriorities[id]?.situacao
                }
            }));
        }
    };

    const handleResponsavelChange = async (id, newResponsavel) => {
        try {
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    responsavel: newResponsavel
                }
            }));

            await AppFetch.put(`/info/${id}/atribuir`, { responsavel: newResponsavel });
        } catch (error) {
            console.error('Erro ao atualizar responsável:', error);
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    responsavel: priorities[id].responsavel
                }
            }));
        }
    };

    /*const handleSaveSolution = async (idChamado) => {
        try {
            const newSolution = solutionDraft[idChamado];
            await AppFetch.put(`/info/${idChamado}/solucao`, { solucao: newSolution });

            // Atualiza o estado local com os dados mais recentes do servidor
            const updatedData = await fetchData();
            setData(updatedData);
        } catch (error) {
            console.error('Erro ao atualizar solução do chamado:', error);
        }
    };

    const handleSolutionChange = (idChamado, newSolution) => {
        setSolutionDraft(prevDraft => ({
            ...prevDraft,
            [idChamado]: newSolution // Armazena localmente a solução digitada
        }));
    };*/

    const handleSaveSolution = async (idChamado) => {
        try {
            const newSolution = solutionDraft[idChamado];
            await AppFetch.put(`/info/${idChamado}/solucao`, { solucao: newSolution });

            // Atualiza o estado local com os dados mais recentes do servidor
            const updatedData = await fetchData();
            setData(updatedData);

            console.log('Solução do chamado atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar solução do chamado:', error);
        }
    };

    const handleSolutionChange = (idChamado, newSolution) => {
        setSolutionDraft(prevDraft => ({
            ...prevDraft,
            [idChamado]: newSolution // Armazena localmente a solução digitada
        }));
    };


    const sortedData = [...data].sort((a, b) => {
        return priorities[a.id_chamado]?.prioridade - priorities[b.id_chamado]?.prioridade;
    });

    return (
        <div className="info-chamados-container">
            <h2>Chamados Atribuídos ao Administrador</h2>
            <label>Selecione um administrador:</label>
            <select value={adminId} onChange={handleAdminChange}>
                {administrators.map(admin => (
                    <option key={admin.admin_id} value={admin.admin_id}>
                        {admin.nome} {admin.sobrenome}
                    </option>
                ))}
            </select>

            <button onClick={handleSearchChamados}>Pesquisar</button>
            
            <table className="info-chamados-table">
                <thead>
                    <tr>
                        <th>ID Chamado</th>
                        <th>Nome Usuário</th>
                        <th>Email Usuário</th>
                        <th>Setor Usuário</th>
                        <th>Título Form</th>
                        <th>Descrição Form</th>
                        <th>Local Form</th>
                        <th>Prioridade</th>
                        <th>Situação</th>
                        <th>Responsável</th>
                        <th>Solução</th>
                        <th>Enviar Solução</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr key={item.id_chamado} className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td>{item.id_chamado}</td>
                            <td>{item.nome_usuario}</td>
                            <td>{item.email_usuario}</td>
                            <td>{item.setor_usuario}</td>
                            <td>{item.titulo_form}</td>
                            <td>{item.descricao_form}</td>
                            <td>{item.local_form}</td>
                            <td>
                                <select
                                    className='select-info-calls'
                                    value={priorities[item.id_chamado]?.prioridade}
                                    onChange={(e) => handlePriorityChange(item.id_chamado, parseInt(e.target.value))}
                                >
                                    <option value="1">Alta</option>
                                    <option value="2">Média-Alta</option>
                                    <option value="3">Média</option>
                                    <option value="4">Média-Baixa</option>
                                    <option value="5">Baixa</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    className='select-info-calls'
                                    value={priorities[item.id_chamado]?.situacao}
                                    onChange={(e) => handleSituationChange(item.id_chamado, e.target.value)}
                                >
                                    <option value="Para fazer">Para fazer</option>
                                    <option value="Fazendo">Fazendo</option>
                                    <option value="Feito">Feito</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    className='select-info-calls'
                                    value={priorities[item.id_chamado]?.responsavel || ''}
                                    onChange={(e) => handleResponsavelChange(item.id_chamado, parseInt(e.target.value))}
                                >
                                    <option value="">Selecione um responsável</option>
                                    {administrators.map(admin => (
                                        <option key={admin.admin_id} value={admin.admin_id}>
                                            {admin.nome} {admin.sobrenome}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <textarea
                                    value={solutionDraft[item.id_chamado] || ''}
                                    onChange={(e) => handleSolutionChange(item.id_chamado, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleSaveSolution(item.id_chamado)}>Salvar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InfoChamados;
