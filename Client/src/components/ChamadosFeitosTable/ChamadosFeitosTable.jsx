import React, { useEffect, useState } from 'react';
import AppFetch from '../../axios/config';

import '../InfoChamadosTable/InfoChamadosTable.css';

const ChamadosFeitosTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AppFetch.get('/info/done');
                console.log('Response data:', response.data);

                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

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
                    {data.map((item, index) => (
                        <tr key={item.id_chamado} className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td>{item.id_chamado}</td>
                            <td>{item.nome_usuario}</td>
                            <td>{item.email_usuario}</td>
                            <td>{item.setor_usuario}</td>
                            <td>{item.titulo_form}</td>
                            <td>{item.descricao_form}</td>
                            <td>{item.local_form}</td>
                            <td>{item.prioridade}</td>
                            <td>{item.situacao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChamadosFeitosTable;
