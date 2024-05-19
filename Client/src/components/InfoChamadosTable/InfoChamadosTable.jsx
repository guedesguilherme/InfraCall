import React, { useEffect, useState } from 'react';
import AppFetch from '../../axios/config';
import '../InfoChamadosTable/InfoChamadosTable.css';

const InfoChamados = () => {
    const [data, setData] = useState([]);
    const [priorities, setPriorities] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AppFetch.get('/info');
                console.log('Response data:', response.data);

                const initialData = response.data.reduce((acc, item) => {
                    acc[item.id_chamado] = {
                        prioridade: item.prioridade,
                        situacao: item.situacao
                    };
                    return acc;
                }, {});
                console.log('Initial data:', initialData);

                setData(response.data);
                setPriorities(initialData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
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
                situacao: item.situacao
            });
        } catch (error) {
            console.error('Erro ao atualizar prioridade:', error);
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    prioridade: priorities[id].prioridade
                }
            }));
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
                situacao: newSituation
            });
        } catch (error) {
            console.error('Erro ao atualizar situação:', error);
            setPriorities(prevPriorities => ({
                ...prevPriorities,
                [id]: {
                    ...prevPriorities[id],
                    situacao: priorities[id].situacao
                }
            }));
        }
    };

    const sortedData = [...data].sort((a, b) => {
        return priorities[a.id_chamado]?.prioridade - priorities[b.id_chamado]?.prioridade;
    });

    return (
        <div className="info-chamados-container">
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InfoChamados;
